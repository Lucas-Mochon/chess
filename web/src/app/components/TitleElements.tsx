import CustomIcon from "./CIcon";

interface TitleElementsProps {
    title: string;
    icon?: string;
    iconAction?: boolean;
    action?: () => void;
    href?: string;
    hr?: boolean;
}

const TitleElements: React.FC<TitleElementsProps> = ({
    title,
    icon,
    iconAction = true,
    action,
    href,
    hr = true,
}) => {
    return (
        <div>
            {href && !iconAction ? (
                <div>
                    <a href={href} className="view-toggle text-white text-decoration-none">
                        <h2 className="dropdown-title d-flex justify-content-between align-items-center mb-3 mt-1">
                            <b>{title}</b>
                        </h2>
                    </a>
                    {hr ? (
                        <hr className="mt-0 mb-3" />
                    ) : null}
                </div>
            ) : (
                <div>
                    <h2 className="dropdown-title d-flex justify-content-between align-items-center mb-3">
                        {title}
                        {icon && (
                            <div className="view-toggle">
                                {action ? (
                                    <button
                                        onClick={action}
                                        className="btn btn-link p-1 text-white text-decoration-none"
                                    >
                                        <CustomIcon name={icon} size={24} />
                                    </button>
                                ) : href ? (
                                    <a
                                        href={href}
                                        className="btn btn-link p-1 text-white text-decoration-none"
                                    >
                                        <CustomIcon name={icon} size={24} />
                                    </a>
                                ) : null}
                            </div>
                        )}
                    </h2>
                    {hr ? (
                        <hr className="mt-0 mb-3" />
                    ) : null}
                </div>
            )}
        </div>
    );
};

export default TitleElements;
