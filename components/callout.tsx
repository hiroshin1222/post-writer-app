export default function Callout({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-blue-500 text-white p-4 rounded-md">
            {children}
        </div>
    )
}