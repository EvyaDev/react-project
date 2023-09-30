import React from 'react'
import "././style/About.css"
import { APP_NAME } from './App'

export default function About() {
    return (
        <div className='About'>
            <header>
                <h1>אודות {APP_NAME}</h1>
            </header>
            <br />
            <main>
                <section>
                    <h3>תכונות מרכזיות</h3>
                    <ul>
                        <li>ניהול כרטיסי מתכונים: הוספה, עריכה, ומחיקה של מתכונים.</li>
                        <li>מערכת חיפוש: אפשרות לחפש מתכונים לפי כותרת המתכון.</li>
                        <li>ניהול מועדפים: הוספה והסרה של מתכונים מהמועדפים שלך.</li>
                        <li> ממשק ידידותי למשתמש ומערכת שמספקת חווית משתמש נוחה.</li>
                    </ul>
                </section>
                <br />
                <br />
                <section>
                    <h3>השתמשו ב-{APP_NAME}</h3>
                    <p>
                        אם אתם מחפשים מערכת יעילה לניהול מתכונים או פשוט אוהבים לבשל ולחלוק את המתכונים שלכם עם העולם,
                        {APP_NAME} היא המערכת שתפתור את הצרכים שלכם.
                    </p>
                </section>
                <br />
                <br />
                <section>
                    <h3>שאלות נוספות?</h3>
                    <p>
                        אם יש לך שאלות, הצעות או בקשות, אנחנו כאן לשמוע ממך.
                        אנו מוכנים לעזור בכל שלב ולהשקיע בהם כדי לשפר את המערכת ולהביא לך את החוויה הטובה ביותר.
                    </p>
                </section>
            </main>
        </div>
    )
}