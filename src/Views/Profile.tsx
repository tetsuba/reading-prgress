import Header from "../Components/Header/Header";

export default function Profile() {
    return (
        <>
            <Header text="Profile" />
            <main>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    <div className="px-4 py-6 sm:px-0">
                        <div>
                            <div className="md:grid md:grid-cols-3 md:gap-6">
                                <div className="md:col-span-1">
                                    <div className="px-4 sm:px-0">
                                        <h3 className="text-lg font-medium leading-6 text-gray-900">Profile</h3>
                                        <p className="mt-1 text-sm text-gray-600">This information will be displayed publicly so be
                                            careful what you share.</p>
                                    </div>
                                </div>
                                <div className="mt-5 md:col-span-2 md:mt-0">
                                    <form action="#" method="POST">
                                        <div className="shadow sm:overflow-hidden sm:rounded-md">
                                            <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                                                <div className="grid grid-cols-3 gap-6">
                                                    <div className="col-span-3 sm:col-span-2">
                                                        <div className="mt-1 flex rounded-md shadow-sm">
                                                            <span
                                                                className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
                                                                First Name:
                                                            </span>
                                                            <input type="text" name="company-website" id="company-website"
                                                                   className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                                   placeholder="Bob" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-3 gap-6">
                                                    <div className="col-span-3 sm:col-span-2">
                                                        <div className="mt-1 flex rounded-md shadow-sm">
                                                            <span
                                                                className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
                                                                Last Name:
                                                            </span>
                                                            <input type="text" name="company-website" id="company-website"
                                                                   className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                                   placeholder="Bob" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-3 gap-6">
                                                    <div className="col-span-3 sm:col-span-2">
                                                        <div className="mt-1 flex rounded-md shadow-sm">
                                                            <span
                                                                className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
                                                                Email
                                                            </span>
                                                            <input type="text" name="company-website" id="company-website"
                                                                   className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                                   placeholder="Bob" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-3 gap-6">
                                                    <div className="col-span-3 sm:col-span-2">
                                                        <div className="mt-1 flex rounded-md shadow-sm">
                                                            <span
                                                                className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
                                                                Password
                                                            </span>
                                                            <input type="text" name="company-website" id="company-website"
                                                                   className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                                   placeholder="Bob" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

        </>
    )
}