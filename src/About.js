import React from 'react'
import "././style/about.css"

export default function About() {
    return (
        <div className='About'>
            <header>
                <h1>אודות YummyCards</h1>
            </header>
            <br />
            <main>
                <section>
                    <h2>המטרה שלנו</h2>
                    <p>
                        ב-YummyCards אנחנו מחויבים לספק פתרונות תכנות ומותאמים אישית לכל משתמש.
                        יחד עם יכולות ניהול וחיפוש מתקדמות, אנחנו מבטיחים שתוכלו למצוא, לערוך ולשתף מתכונים בקלות וביעילות.
                    </p>
                </section>
                <br />
                <br />
                <section>
                    <h2>תכונות מרכזיות</h2>
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
                    <h2>השתמשו ב-YummyCards</h2>
                    <p>
                        אם אתם מחפשים מערכת יעילה לניהול מתכונים או פשוט אוהבים לבשל ולחלוק את המתכונים שלכם עם העולם,
                        YummyCards היא המערכת שתפתור את הצרכים שלכם.
                    </p>
                </section>
                <br />
                <br />
                <section>
                    <h2>שאלות נוספות?</h2>
                    <p>
                        אם יש לך שאלות, הצעות או בקשות, אנחנו כאן לשמוע ממך.
                        אנו מוכנים לעזור בכל שלב ולהשקיע בהם כדי לשפר את המערכת ולהביא לך את החוויה הטובה ביותר.
                    </p>
                </section>
            </main>
        </div>
    )
}
