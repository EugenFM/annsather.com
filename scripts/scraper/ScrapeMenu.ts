import axios from 'axios';
import * as cheerio from 'cheerio';
import { writeFileSync } from 'fs';

interface MenuItem { title: string; price: string; }

const PAGES = [
    { name: 'Breakfast', url: 'http://www.annsather.com/restmenus/restbreakfast.html' },
    { name: 'Lunch',     url: 'http://www.annsather.com/restmenus/restlunch.html' },
    { name: 'Specials',  url: 'http://www.annsather.com/restmenus/restspecials.html' },
    { name: 'Entrees',   url: 'http://www.annsather.com/restmenus/restentrees.html' },
    { name: 'Holiday',   url: 'http://www.annsather.com/restmenus/restholiday.html' },
    { name: 'Carryouts', url: 'http://www.annsather.com/restmenus/restcarryout.html' }
];

const tidy = (s: string) =>
    s.replace(/\u00a0/g, ' ')          // &nbsp; → space
        .replace(/\s+/g, ' ')             // collapse runs of spaces
        .replace(/\.{2,}|–+/g, '')        // leader dots / long dashes
        .trim();

async function run() {
    const menu: Record<string, Record<string, MenuItem[]>> = {};

    for (const { name, url } of PAGES) {
        const { data: html } = await axios.get(url, {
            headers: { 'User-Agent': 'Mozilla/5.0' }
        });
        const $ = cheerio.load(html);

        /* Ann Sather’s markup = <div.info_item_head2> CATEGORY then <p> lines */
        const cats: Record<string, MenuItem[]> = {};
        $('div.info_item_head2').each((_, h) => {
            const category = tidy($(h).text());
            cats[category] = [];

            /* grab all <p> until we hit the next header */
            $(h).nextUntil('div.info_item_head2', 'p').each((__, p) => {
                const raw = tidy($(p).text());
                if (!raw) return;

                const priceMatch = raw.match(/\$\s*[\d.,\/]+/);
                if (!priceMatch) return;                 // skip description-only lines

                const price  = priceMatch[0].replace(/\s+/g, '');
                const title  = tidy(raw.split(priceMatch[0])[0])
                    .replace(/\*$/, '')     // trailing * nutrition flag
                    .trim();

                if (title) cats[category].push({ title, price });
            });
        });

        menu[name] = cats;
    }

    writeFileSync('src/data/menu.json', JSON.stringify(menu, null, 2));
    console.log('✓ menu.json written');
}

run().catch(console.error);
