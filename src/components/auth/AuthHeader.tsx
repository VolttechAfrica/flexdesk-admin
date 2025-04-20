import style from "@styles/Login.module.css";


const AuthHeader = ({
    title,
    subtitle
}) => {
    return (
        <div className={style.welcome_heading}>
            <h1 className={style.verification_title}>{title}</h1>
            <p className={style.subtitle}>{subtitle}</p>
        </div>
    )
}

export default AuthHeader;