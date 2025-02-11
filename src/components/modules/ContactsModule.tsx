import { baseUrl } from '@/utils/baseUrl';
import React from 'react'
import he from 'he';


export default async function ContactsModule({ page }: { page: PageI }) {
    const contactsResponse = await fetch(`${baseUrl}/wp-json/wp/v2/contacts`);
    const contacts = await contactsResponse.json();

    const email = contacts[0].email;
    const phone = contacts[0].phone;

    return (
        <main className="contacts">
            <div className="container">
                <h1 className="contacts__h1 h1">
                    {he.decode(page.title.rendered)}
                </h1>
                <div className="contacts__info">
                    <p>
                        <strong>
                            Телефон: {phone}
                        </strong>
                    </p>
                    <p>
                        <strong>
                            Email: {email}
                        </strong>
                    </p>
                </div>
            </div>
        </main>
    )
}