import { useContext, useState } from "react"
import { JOI_HEBREW } from "../../joi-hebrew"
import joi from 'joi'
import { useNavigate } from "react-router-dom";
import { token, userContext } from "../../App";
import { AiOutlineHeart } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { BsTrash3 } from "react-icons/bs";
import "././style/Add-EditCard.css"

export default function AddCard() {

    const { snackbar } = useContext(userContext)
    const [IsValid, setIsValid] = useState(true);
    const [errors, setErrors] = useState({});
    const placeholderImg = "https://theme-assets.getbento.com/sensei/a42cf8c.sensei/assets/images/catering-item-placeholder-704x520.png"

    const addCardSchema = joi.object({
        title: joi.string().min(3).max(50).required(),
        subtitle: joi.string().max(200).required(),
        imgUrl: joi.string().required(),
        imgAlt: joi.string().required(),
        description: joi.string().min(10).max(2000).required(),
    })

    const Navigate = useNavigate()
    const [formData, setFormData] = useState({
        "phone": "",
        "email": "",
        "state": "",
        "country": "",
        "city": "",
        "street": "",
        "houseNumber": "",
        "zip": "",
        "web": "",
    })

    function handleInput(ev) {
        const { id, value } = ev.target;

        const updateFormData = ({
            ...formData,
            [id]: value
        })

        const schema = addCardSchema.validate(updateFormData, { abortEarly: false, allowUnknown: true, messages: { he: JOI_HEBREW }, errors: { language: 'he' } });

        const errors = {};
        if (schema.error) {
            for (const e of schema.error.details) {
                errors[e.context.key] = e.message;
            };
            setIsValid(false)
        } else {
            setIsValid(true)
        }
        setFormData(updateFormData)
        setErrors(errors)
    }

    function addNew(ev) {
        ev.preventDefault();

        fetch(`https://api.shipap.co.il/business/cards?token=${token}`, {
            credentials: 'include',
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(formData),
        })
            .then(() => {
                snackbar("הכרטיס התווסף בהצלחה!")
                Navigate("/");
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="AddCard">

            <div className="form">
                <form onSubmit={addNew}>
                    <h2>הוספת מתכון חדש</h2>
                    <label>* כותרת</label>
                    <input type="text" id="title" placeholder="כותרת" onChange={handleInput}></input>
                    <p className="validationError">{errors.title}</p>

                    <label>* כותרת משנה</label>
                    <input type="text" id="subtitle" placeholder="כותרת משנה" onChange={handleInput}></input>
                    <p className="validationError">{errors.subtitle}</p>

                    <label>* תמונה</label>
                    <input type="text" id="imgUrl" placeholder="תמונה" onChange={handleInput}></input>
                    <p className="validationError">{errors.imgUrl}</p>

                    <label>* alt</label>
                    <input type="text" id="imgAlt" placeholder="alt image" onChange={handleInput}></input>
                    <p className="validationError">{errors.imgAlt}</p>

                    <label>קישור חיצוני</label>
                    <input type="text" id="web" placeholder="URL" onChange={handleInput}></input>
                    <p className="validationError">{errors.web}</p>

                    <label> * תוכן</label>
                    <textarea id="description" lang="1000" rows={10} onChange={handleInput}></textarea>
                    <p className="validationError">{errors.description}</p>

                    <button disabled={!IsValid}>הוסף</button>
                </form>
            </div>
            <div className="display" >

                <p>תצוגה מקדימה</p>
                <div className="Card" style={{ backgroundImage: `url(${formData.imgUrl || placeholderImg})` }}>
                    <div className="cardFrame" >
                        <h2>{formData.title || "כותרת לדוגמה"}</h2>
                        <p>{(formData.subtitle && formData.subtitle.slice(0, 70)) || "כותרת משנה לדוגמה"}...</p>

                        <div className="actions" >
                            <AiOutlineHeart className='heart' />
                            <FiEdit className='heart' />
                            <BsTrash3 className='heart' />
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}