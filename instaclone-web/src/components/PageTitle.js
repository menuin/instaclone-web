import { Helmet } from "react-helmet-async";
import { PropTypes } from "prop-types";

function PageTitle({ title }) {
    console.log(title);
    return <Helmet>{title} | Instaclone</Helmet>
}

PageTitle.propTypes = {
    title: PropTypes.string.isRequired
}

export default PageTitle;