import { createContext, useContext, useState } from "react";

const ExtraContext = createContext();

export const useExtra = () => {
    const value = useContext(ExtraContext);
    return value;
}

export const ExtraProvider = ({ children }) => {
    const [expandText, setExpandText] = useState({});

    // here show the sold status
    const renderSoldValue = (isSold) => {
        return isSold ? "Yes" : "No";
    };

    // this function for handle the description part of the items
    const toggleDescription = (index) => {
        setExpandText((prevState) => ({
            ...prevState,
            [index]: !prevState[index]
        }));
    };

    // this is the function for show how much line we have to show
    const renderDescription = (description, index) => {
        const words = description.split(' ');
        const isExpanded = expandText[index];
        const truncatedText = words.slice(0, 10).join(' ') + (words.length > 10 ? '...' : '');


        return (
            <>
                <span>{isExpanded ? description : truncatedText}</span>
                {words.length > 10 && (
                    <button className="btn btn-link text-danger" onClick={() => toggleDescription(index)}>
                        {isExpanded ? "Read Less" : "Read More"}
                    </button>
                )}
            </>
        );
    };
    return (
        <ExtraContext.Provider value={{ renderSoldValue, renderDescription }}>
            {children}
        </ExtraContext.Provider>
    )
}