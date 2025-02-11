import React from 'react'
import ContactsModule from '../modules/ContactsModule'
import he from 'he';


export default function PageTemplate({ page }: { page: PageI }) {
  if (page.slug === 'contacts') {
    return (
      <ContactsModule
        page={page}
      />
    )
  }

  return (
    <main className="about">
      <div className="container">
        <h1 className="about__h1 h1">
          {he.decode(page.title.rendered)}
        </h1>
        <div className="about__content"
          dangerouslySetInnerHTML={{
            __html: he.decode(page.content.rendered),
          }}
        >
        </div>
      </div>
    </main>
  )
}