interface DashboardHeaderProps {
    heading: string;
    text?: string;
    children?: React.ReactNode;
}


export default function DashboardHeader({ heading, text, children }: DashboardHeaderProps) {
    return (
        <div className="flex items-center justify-between">
            <div className="grid gap-1">
                <h1 className="text-2xl font-bold">{heading}</h1>
                {text && <p className="text-sm text-muted-foreground">{text}</p>}
            </div>
            {children}
        </div>
    )
}

        