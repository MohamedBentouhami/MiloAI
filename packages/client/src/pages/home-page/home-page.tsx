export default function HomePage() {
    return (
        <div className="flex h-[calc(100%-20%)] items-center justify-center">
            <div className="max-w-xl rounded-2xl bg-white p-8 shadow-md text-center">
                <h1 className="mb-4 text-3xl font-bold text-gray-800">
                    Welcome to Milo
                </h1>
                <p className="text-gray-600 leading-relaxed">
                    Milo is a platform featuring AI-powered tools such as review
                    summarization and an intelligent chatbot to enhance your experience.
                </p>
            </div>
        </div>
    );
}
