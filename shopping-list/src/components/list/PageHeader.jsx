import { useTranslation } from "react-i18next";
import { useTheme } from "../../context/ThemeContext";

function PageHeader({ userName, title }) {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();

  function switchLang(lang) {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  }

  return (
    <div className="page-header">
      <h1>{title ?? t("shoppingLists")}</h1>
      <div className="header-right">
        <button
          className={`lang-btn${i18n.language === "cs" ? " active" : ""}`}
          onClick={() => switchLang("cs")}
        >
          CZ
        </button>
        <button
          className={`lang-btn${i18n.language === "en" ? " active" : ""}`}
          onClick={() => switchLang("en")}
        >
          EN
        </button>
        <button className="theme-btn" onClick={toggleTheme}>
          {theme === "light" ? "🌙" : "☀️"} {theme === "light" ? t("darkMode") : t("lightMode")}
        </button>
        {userName && <span className="user-badge">☆ {userName}</span>}
      </div>
    </div>
  );
}

export default PageHeader;
