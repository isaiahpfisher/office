import demoRoutes from '@/routes/demo';

import RunnableCode, {
    RunnableCodeProps,
} from '@/components/demo/runnable-code';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Character, Relationship } from '@/types/models';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Demo',
        href: demoRoutes.index().url,
    },
];

export default function Demo({
    relationships,
    characters,
}: {
    relationships: Relationship[];
    characters: Character[];
}) {
    const codeSegments: RunnableCodeProps[] = [
        {
            method: 'GET',
            endpoint: demoRoutes.allQuotes().url,
            code: {
                language: 'php',
                filename: 'DemoController@allQuotes()',
                code: `public function allQuotes(): Collection {
    return Quote::all();
}`,
            },
        },
        {
            method: 'GET',
            endpoint: demoRoutes.view().url,
            code: {
                language: 'php',
                filename: 'DemoController@view()',
                code: `// CREATE VIEW quotes_view AS SELECT id, quote FROM quotes;

public function view(): array {
    return DB::select('SELECT * FROM quotes_view');
}`,
            },
        },
        {
            method: 'GET',
            endpoint: demoRoutes.multipleJoins().url,
            code: {
                language: 'php',
                filename: 'DemoController@multipleJoins()',
                code: `public function multipleJoins() {
    return Character::with([
        'actor',
        'department',
        'roles',
        'branches',
        'quotes',
        'episodes',
        'thingsSheSaid'
    ])->limit(value: 10)->get();
}`,
            },
        },
        {
            method: 'POST',
            endpoint: demoRoutes.reportAffair().url,
            fields: [
                {
                    type: 'select',
                    name: 'victim_relationship_id',
                    placeholder: 'Victim Relationship',
                    options: relationships.map((relationship) => ({
                        label: `${relationship.person_one.first_name} and ${relationship.person_two.first_name}`,
                        value: relationship.id,
                    })),
                },
                {
                    type: 'select',
                    name: 'cheater_id',
                    placeholder: 'Cheater',
                    options: characters.map((character) => ({
                        label: `${character.first_name} ${character.last_name}`,
                        value: character.id,
                    })),
                },
                {
                    type: 'select',
                    name: 'affair_partner_id',
                    placeholder: 'Affair Partner',
                    options: characters.map((character) => ({
                        label: `${character.first_name} ${character.last_name}`,
                        value: character.id,
                    })),
                },
            ],
            code: {
                language: 'php',
                filename: 'DemoController@reportAffair()',
                code: `public function reportAffair(Request $request): RedirectResponse {
    $valid = $request->validate([
        'victim_relationship_id' => 'required|integer|exists:relationships,id',
        'cheater_id' => 'required|integer|exists:characters,id',
        'affair_partner_id' => 'required|integer|exists:characters,id|different:cheater_id',
    ]);

    DB::statement('CALL CreateAffair(?, ?, ?)', [
        $valid['victim_relationship_id'],
        $valid['cheater_id'],
        $valid['affair_partner_id'],
    ]);

    return back();
}`,
            },
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Chat" />
            <div className="space-y-6 p-6">
                {codeSegments.map((segment) => (
                    <RunnableCode {...segment} key={segment.endpoint} />
                ))}
            </div>
        </AppLayout>
    );
}
