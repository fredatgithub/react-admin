import * as React from 'react';
import { Admin } from 'react-admin';
import {
    required,
    Resource,
    testI18nProvider,
    TestMemoryRouter,
} from 'ra-core';
import { InputAdornment } from '@mui/material';

import { Edit, Create } from '../../detail';
import { SimpleForm, TabbedForm } from '../../form';
import { ArrayInput } from './ArrayInput';
import { SimpleFormIterator } from './SimpleFormIterator';
import { TextInput } from '../TextInput';
import { DateInput } from '../DateInput';
import { NumberInput } from '../NumberInput';
import { AutocompleteInput } from '../AutocompleteInput';

export default { title: 'ra-ui-materialui/input/ArrayInput' };

const dataProvider = {
    getOne: () =>
        Promise.resolve({
            data: {
                id: 1,
                title: 'War and Peace',
                authors: [
                    {
                        name: 'Leo Tolstoy',
                        role: 'head_writer',
                    },
                    {
                        name: 'Alexander Pushkin',
                        role: 'co_writer',
                    },
                ],
                tags: ['novel', 'war', 'classic'],
            },
        }),
    update: (_resource, params) => Promise.resolve(params),
    create: (_resource, params) => {
        return Promise.resolve({ data: { ...params.data, id: 2 } });
    },
} as any;

const BookEdit = () => {
    return (
        <Edit
            mutationMode="pessimistic"
            mutationOptions={{
                onSuccess: data => {
                    console.log(data);
                },
            }}
        >
            <SimpleForm>
                <TextInput source="title" />
                <ArrayInput source="authors">
                    <SimpleFormIterator>
                        <TextInput source="name" />
                        <TextInput source="role" />
                    </SimpleFormIterator>
                </ArrayInput>
            </SimpleForm>
        </Edit>
    );
};

export const Basic = () => (
    <TestMemoryRouter initialEntries={['/books/1']}>
        <Admin dataProvider={dataProvider}>
            <Resource name="books" edit={BookEdit} />
        </Admin>
    </TestMemoryRouter>
);

export const Disabled = () => (
    <TestMemoryRouter initialEntries={['/books/1']}>
        <Admin dataProvider={dataProvider}>
            <Resource
                name="books"
                edit={() => {
                    return (
                        <Edit
                            mutationMode="pessimistic"
                            mutationOptions={{
                                onSuccess: data => {
                                    console.log(data);
                                },
                            }}
                        >
                            <SimpleForm>
                                <TextInput source="title" />
                                <ArrayInput source="authors" disabled>
                                    <SimpleFormIterator>
                                        <TextInput source="name" />
                                        <TextInput source="role" />
                                    </SimpleFormIterator>
                                </ArrayInput>
                            </SimpleForm>
                        </Edit>
                    );
                }}
            />
        </Admin>
    </TestMemoryRouter>
);

const BookEditWithAutocomplete = () => {
    return (
        <Edit
            mutationMode="pessimistic"
            mutationOptions={{
                onSuccess: data => {
                    console.log(data);
                },
            }}
        >
            <SimpleForm>
                <TextInput source="title" />
                <ArrayInput source="authors" fullWidth>
                    <SimpleFormIterator>
                        <AutocompleteInput
                            source="role"
                            choices={[
                                { id: 'head_writer', name: 'Head Writer' },
                                { id: 'co_writer', name: 'Co-Writer' },
                            ]}
                        />
                        <TextInput source="name" />
                    </SimpleFormIterator>
                </ArrayInput>
            </SimpleForm>
        </Edit>
    );
};

export const AutocompleteFirst = () => (
    <TestMemoryRouter initialEntries={['/books/1']}>
        <Admin dataProvider={dataProvider}>
            <Resource name="books" edit={BookEditWithAutocomplete} />
        </Admin>
    </TestMemoryRouter>
);

export const Scalar = () => (
    <TestMemoryRouter initialEntries={['/books/1']}>
        <Admin dataProvider={dataProvider}>
            <Resource
                name="books"
                edit={() => (
                    <Edit
                        mutationMode="pessimistic"
                        mutationOptions={{
                            onSuccess: data => {
                                console.log(data);
                            },
                        }}
                    >
                        <SimpleForm>
                            <TextInput source="title" />
                            <ArrayInput source="tags" fullWidth>
                                <SimpleFormIterator disableReordering>
                                    <TextInput
                                        source=""
                                        label="tag"
                                        helperText={false}
                                    />
                                </SimpleFormIterator>
                            </ArrayInput>
                        </SimpleForm>
                    </Edit>
                )}
            />
        </Admin>
    </TestMemoryRouter>
);

export const ScalarI18n = () => (
    <TestMemoryRouter initialEntries={['/books/1']}>
        <Admin
            dataProvider={dataProvider}
            i18nProvider={testI18nProvider({
                messages: {
                    resources: {
                        books: {
                            fields: {
                                tags: 'Some tags',
                                tag: 'A tag',
                            },
                        },
                    },
                },
            })}
        >
            <Resource
                name="books"
                edit={() => (
                    <Edit
                        mutationMode="pessimistic"
                        mutationOptions={{
                            onSuccess: data => {
                                console.log(data);
                            },
                        }}
                    >
                        <SimpleForm>
                            <TextInput source="title" />
                            <ArrayInput source="tags" fullWidth>
                                <SimpleFormIterator disableReordering>
                                    <TextInput
                                        source=""
                                        label="resources.books.fields.tag"
                                        helperText={false}
                                    />
                                </SimpleFormIterator>
                            </ArrayInput>
                        </SimpleForm>
                    </Edit>
                )}
            />
        </Admin>
    </TestMemoryRouter>
);

const order = {
    id: 1,
    date: '2022-08-30',
    customer: 'John Doe',
    items: [
        {
            name: 'Office Jeans',
            price: 45.99,
            quantity: 1,
            extras: [
                {
                    type: 'card',
                    price: 2.99,
                    content: 'For you my love',
                },
                {
                    type: 'gift package',
                    price: 1.99,
                    content: '',
                },
                {
                    type: 'insurance',
                    price: 5,
                    content: '',
                },
            ],
        },
        {
            name: 'Black Elegance Jeans',
            price: 69.99,
            quantity: 2,
            extras: [
                {
                    type: 'card',
                    price: 2.99,
                    content: 'For you my love',
                },
            ],
        },
        {
            name: 'Slim Fit Jeans',
            price: 55.99,
            quantity: 1,
        },
    ],
};

export const Realistic = () => (
    <TestMemoryRouter initialEntries={['/orders/1']}>
        <Admin
            dataProvider={
                {
                    getOne: () => Promise.resolve({ data: order }),
                    update: (_resource, params) => Promise.resolve(params),
                } as any
            }
        >
            <Resource
                name="orders"
                edit={() => (
                    <Edit
                        mutationMode="pessimistic"
                        mutationOptions={{
                            onSuccess: data => {
                                console.log(data);
                            },
                        }}
                    >
                        <SimpleForm sx={{ maxWidth: 600 }}>
                            <TextInput source="customer" helperText={false} />
                            <DateInput source="date" helperText={false} />
                            <ArrayInput source="items">
                                <SimpleFormIterator inline>
                                    <TextInput
                                        source="name"
                                        helperText={false}
                                        sx={{ width: 250 }}
                                    />
                                    <NumberInput
                                        source="price"
                                        helperText={false}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    €
                                                </InputAdornment>
                                            ),
                                        }}
                                        sx={{ maxWidth: 120 }}
                                    />
                                    <NumberInput
                                        source="quantity"
                                        helperText={false}
                                        sx={{ maxWidth: 120 }}
                                    />
                                </SimpleFormIterator>
                            </ArrayInput>
                        </SimpleForm>
                    </Edit>
                )}
            />
        </Admin>
    </TestMemoryRouter>
);

export const NestedInline = () => (
    <TestMemoryRouter initialEntries={['/orders/1']}>
        <Admin
            dataProvider={
                {
                    getOne: () => Promise.resolve({ data: order }),
                    update: (_resource, params) => Promise.resolve(params),
                } as any
            }
        >
            <Resource
                name="orders"
                edit={() => (
                    <Edit
                        mutationMode="pessimistic"
                        mutationOptions={{
                            onSuccess: data => {
                                console.log(data);
                            },
                        }}
                    >
                        <SimpleForm>
                            <TextInput source="customer" helperText={false} />
                            <DateInput source="date" helperText={false} />
                            <ArrayInput source="items">
                                <SimpleFormIterator
                                    inline
                                    sx={{
                                        '& .MuiStack-root': {
                                            flexWrap: 'wrap',
                                        },
                                    }}
                                >
                                    <TextInput
                                        source="name"
                                        helperText={false}
                                        sx={{ width: 200 }}
                                    />
                                    <NumberInput
                                        source="price"
                                        helperText={false}
                                        sx={{ width: 100 }}
                                    />
                                    <NumberInput
                                        source="quantity"
                                        helperText={false}
                                        sx={{ width: 100 }}
                                    />
                                    <ArrayInput source="extras">
                                        <SimpleFormIterator
                                            inline
                                            disableReordering
                                        >
                                            <TextInput
                                                source="type"
                                                helperText={false}
                                                sx={{ width: 100 }}
                                            />
                                            <NumberInput
                                                source="price"
                                                helperText={false}
                                                sx={{ width: 100 }}
                                            />
                                            <TextInput
                                                source="content"
                                                helperText={false}
                                                sx={{ width: 200 }}
                                            />
                                        </SimpleFormIterator>
                                    </ArrayInput>
                                </SimpleFormIterator>
                            </ArrayInput>
                        </SimpleForm>
                    </Edit>
                )}
            />
        </Admin>
    </TestMemoryRouter>
);

export const ActionsLeft = () => (
    <TestMemoryRouter initialEntries={['/books/1']}>
        <Admin dataProvider={dataProvider}>
            <Resource
                name="books"
                edit={() => (
                    <Edit
                        mutationMode="pessimistic"
                        mutationOptions={{
                            onSuccess: data => {
                                console.log(data);
                            },
                        }}
                    >
                        <SimpleForm>
                            <TextInput source="title" />
                            <ArrayInput source="authors">
                                <SimpleFormIterator
                                    sx={{
                                        '& .RaSimpleFormIterator-indexContainer':
                                            {
                                                order: 0,
                                            },
                                        '& .RaSimpleFormIterator-action': {
                                            order: 1,
                                            visibility: 'visible',
                                        },
                                        '& .RaSimpleFormIterator-form': {
                                            order: 2,
                                        },
                                    }}
                                >
                                    <TextInput source="name" />
                                    <TextInput source="role" />
                                </SimpleFormIterator>
                            </ArrayInput>
                        </SimpleForm>
                    </Edit>
                )}
            />
        </Admin>
    </TestMemoryRouter>
);

const globalValidator = values => {
    const errors: any = {};
    if (!values.authors || !values.authors.length) {
        errors.authors = 'ra.validation.required';
    } else {
        errors.authors = values.authors.map(author => {
            const authorErrors: any = {};
            if (!author?.name) {
                authorErrors.name = 'A name is required';
            }
            if (!author?.role) {
                authorErrors.role = 'ra.validation.required';
            }
            return authorErrors;
        });
    }
    return errors;
};
const BookEditGlobalValidation = () => {
    return (
        <Edit
            mutationMode="pessimistic"
            mutationOptions={{
                onSuccess: data => {
                    console.log(data);
                },
            }}
        >
            <SimpleForm validate={globalValidator}>
                {/* 
                  We still need `validate={required()}` to indicate fields are required 
                  with a '*' symbol after the label, but the real validation happens in `globalValidator`
                */}
                <ArrayInput source="authors" fullWidth validate={required()}>
                    <SimpleFormIterator>
                        <TextInput source="name" validate={required()} />
                        <TextInput source="role" validate={required()} />
                    </SimpleFormIterator>
                </ArrayInput>
            </SimpleForm>
        </Edit>
    );
};
export const GlobalValidation = () => (
    <TestMemoryRouter initialEntries={['/books/1']}>
        <Admin dataProvider={dataProvider}>
            <Resource name="books" edit={BookEditGlobalValidation} />
        </Admin>
    </TestMemoryRouter>
);

const CreateGlobalValidationInFormTab = () => {
    return (
        <Create
            mutationOptions={{
                onSuccess: data => {
                    console.log(data);
                },
            }}
        >
            <TabbedForm validate={globalValidator}>
                {/* 
                  We still need `validate={required()}` to indicate fields are required 
                  with a '*' symbol after the label, but the real validation happens in `globalValidator`
                */}
                <TabbedForm.Tab label="Main">
                    <TextInput source="title" />
                    <ArrayInput
                        source="authors"
                        fullWidth
                        validate={required()}
                    >
                        <SimpleFormIterator>
                            <TextInput source="name" validate={required()} />
                            <TextInput source="role" validate={required()} />
                        </SimpleFormIterator>
                    </ArrayInput>
                </TabbedForm.Tab>
            </TabbedForm>
        </Create>
    );
};

export const ValidationInFormTab = () => (
    <TestMemoryRouter initialEntries={['/books/create']}>
        <Admin dataProvider={dataProvider}>
            <Resource name="books" create={CreateGlobalValidationInFormTab} />
        </Admin>
    </TestMemoryRouter>
);
