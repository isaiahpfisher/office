<?php

namespace Database\Seeders;

use App\Models\Season;
use Illuminate\Database\Seeder;

class SeasonSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {
        $seasons = [
            [
                'id' => 1,
                'number' => 1,
                'start_date' => '2005-03-24',
                'end_date' => '2005-04-26',
                'overview' => "This season introduced the main characters, and established the general plot as a documentary crew is recording the lives of the employees of the fictitious Dunder Mifflin Paper Company. In a mockumentary format, it shows Michael Scott (Steve Carell), regional manager of the Scranton branch office, as he tries to convince the filmmakers of the documentary that he presides over a happy, well-running office. Meanwhile, sales rep Jim Halpert (John Krasinski) finds methods to undermine his cube-mate, Dwight Schrute (Rainn Wilson); receptionist Pam Beesly (Jenna Fischer) is trying to deal with Michael's insensitivities and flubs; and the temporary employee Ryan Howard (B. J. Novak) is acting mostly as an observer of the insanity around him.",
                'created_at' => '2025-11-26 00:57:00',
                'updated_at' => '2025-11-26 01:29:58',
            ],
            [
                'id' => 2,
                'number' => 2,
                'start_date' => '2005-09-20',
                'end_date' => '2006-05-11',
                'overview' => "The second season storyline further delved into the fear of company downsizing, along with the introduction of new characters and developing some of the minor ones—especially that of Dwight. As Michael begins a relationship with his boss Jan Levinson (Melora Hardin), Pam and Jim's relationship becomes one of the focal points of the season. Their compatibility becomes more obvious as Jim's feelings for Pam continue to grow, while she struggles with her engagement to warehouse worker Roy Anderson (David Denman).",
                'created_at' => '2025-11-26 01:32:25',
                'updated_at' => '2025-11-26 01:32:25',
            ],
            [
                'id' => 3,
                'number' => 3,
                'start_date' => '2006-09-21',
                'end_date' => '2007-05-17',
                'overview' => "The season marked the move of main character Jim Halpert from Scranton to Stamford, and also introduced Rashida Jones as Karen Filippelli, and Ed Helms as Andy Bernard (both members of Dunder Mifflin Stamford) as recurring characters. Helms would later be promoted to series regular. The main plot for the early episodes of the season deals with a recurring problem in seasons one and two—the problem of company downsizing—while in the latter half of the season, inter-office relationships also became a major plot point. Metacritic, which assigns normalized ratings out of 100 to critics' reviews, calculated an average score of 85/100 based on five collected reviews, indicating \"universal acclaim\".",
                'created_at' => '2025-11-26 01:33:48',
                'updated_at' => '2025-11-26 01:33:48',
            ],
            [
                'id' => 4,
                'number' => 4,
                'start_date' => '2007-09-27',
                'end_date' => '2008-05-15',
                'overview' => "Season four marked the departure of Karen Filippelli as a regular character, although she appeared for a few seconds in the first episode, \"Fun Run\"; and was featured as the regional manager of the Utica branch in the tenth episode, \"Branch Wars\". Relationships emerged as the main theme of the season, with Jim and Pam's rising, as well as Michael and Jan's and Dwight and Angela's declining. Technology was another theme as the office staff struggled with initiatives introduced by Ryan to modernize the company.",
                'created_at' => '2025-11-26 01:34:53',
                'updated_at' => '2025-11-26 01:34:53',
            ],
            [
                'id' => 5,
                'number' => 5,
                'start_date' => '2008-09-25',
                'end_date' => '2009-05-14',
                'overview' => "This season highlighted Michael's roller coaster relationship with corporate, as he is first praised and rewarded for impressive numbers despite the economic downturn. However, when a new boss is hired Michael feels slighted by his controlling manner. The theme of the beginning and middle of the season was mostly personal relationships with Dwight, Angela, Andy, Jim, Pam, Michael, Jan, and Holly. However, the theme transformed into career growth, as Ryan, Pam, and Michael set up the Michael Scott Paper Company, Pam and Michael go on a lecture circuit, Charles takes Jan's and Ryan's job, and Jim has trouble getting on with Charles. The last few episodes of the season focused on relationships once again, with major events taking place in Jim and Pam's relationship, and also with Holly and Michael.",
                'created_at' => '2025-11-26 01:35:44',
                'updated_at' => '2025-11-26 01:35:44',
            ],
            [
                'id' => 6,
                'number' => 6,
                'start_date' => '2009-09-17',
                'end_date' => '2010-05-20',
                'overview' => "Story arcs in the sixth season include Jim becoming co-manager with Michael of the Scranton branch, Michael dating Pam's mother, Dwight attempting to get Jim fired, and Dunder Mifflin facing an uncertain future due to rumors of insolvency, eventually becoming part of a larger corporation called Sabre. The season also prominently features the long-awaited wedding between Jim and Pam, as well as the birth of their first child.",
                'created_at' => '2025-11-26 01:36:41',
                'updated_at' => '2025-11-26 01:36:41',
            ],
            [
                'id' => 7,
                'number' => 7,
                'start_date' => '2010-09-23',
                'end_date' => '2011-05-19',
                'overview' => "The seventh season of The Office largely revolves around the character development and departure of Michael from the series. After Toby is called for jury duty, Holly returns, causing Michael to once again pursue her, despite her being in a relationship. After eventually proving himself to her, the two get engaged, but Michael decides to move to Boulder, Colorado to help Holly take care of her elderly parents. After Michael leaves, the office is forced to choose a new manager.",
                'created_at' => '2025-11-26 01:37:31',
                'updated_at' => '2025-11-26 01:37:31',
            ],
            [
                'id' => 8,
                'number' => 8,
                'start_date' => '2011-09-22',
                'end_date' => '2012-05-10',
                'overview' => "The eighth season of The Office largely centers around the antics of the new Sabre CEO, Robert California. Initially, he appears calm, collected, and calculating. However, as the season progresses, it becomes obvious that his management style is slowly destroying the company. Dwight—along with Jim, Stanley, Ryan, Erin, and Cathy (Lindsey Broad)—travel to Florida to help set up a Sabre Store, where Nellie Bertram (Catherine Tate) is introduced. Eventually, former CFO of Dunder Mifflin David Wallace buys back the company, firing California.",
                'created_at' => '2025-11-26 01:38:16',
                'updated_at' => '2025-11-26 01:38:16',
            ],
            [
                'id' => 9,
                'number' => 9,
                'start_date' => '2012-09-20',
                'end_date' => '2013-05-16',
                'overview' => "The ninth season largely focuses on the relationship between Jim and Pam Halpert. After Jim decides to follow his dream and start a sports marketing company in Philadelphia, Pam begins to worry about moving, and the couple's relationship experiences stress. Meanwhile, Andy abandons the office for a three-month boating trip, and eventually quits his job to pursue his dream of becoming a star. Dwight is then promoted to regional manager.",
                'created_at' => '2025-11-26 01:39:05',
                'updated_at' => '2025-11-26 01:39:05',
            ],
        ];

        Season::upsert(
            $seasons,
            ['id'],
            ['number', 'start_date', 'end_date', 'overview', 'created_at', 'updated_at']
        );
    }
}
