import { Link } from "react-router-dom"

const PageBreadCrumb = (
    { pageTitle, isBreadCrumb }: 
    { pageTitle: string, isBreadCrumb?: boolean }
    ) => {
    return (
        <div className="flex items-center justify-between gap-3 mb-6 px-5">
            <div>
                <h2 className="text-xl font-semibold text-gray-800">
                    {pageTitle}
                </h2>
            </div>
            {!isBreadCrumb && (
                <nav>
                    <ol className="flex items-center gap-1.5">
                        <li>
                            <Link to={"/"} className="flex items-center gap-1.5 font-semibold text-gray-600 hover:underline hover:text-gray-800">
                                Home
                                <svg
                                    className="stroke-current"
                                    width="17"
                                    height="16"
                                    viewBox="0 0 17 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M6.0765 12.667L10.2432 8.50033L6.0765 4.33366"
                                        stroke=""
                                        strokeWidth="1.2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </Link>
                        </li>

                        <li className="text-gray-700 font-semibold hover:underline hover:text-gray-800">
                            {pageTitle}
                        </li>
                    </ol>
                </nav>
            )}
        </div>
    )
}

export default PageBreadCrumb