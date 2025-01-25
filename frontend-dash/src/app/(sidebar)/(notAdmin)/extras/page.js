import { Button } from "@/components/ui/button"

export default function Extras() {
    return (
        <div className="grid place-items-center bottom-0 min-h-screen">
            <div className="flex flex-wrap gap-6">
                <div className="grid gap-y-4">
                    {/* PUEDES PASARLE EL EVENTO ON CLICK Y QUE HAGA EL EVENTO QUE DESEES. */}
                    <Button className="min-w-[250px]">
                        Positions
                    </Button>
                    <Button  className="min-w-[250px]">
                        Maturities
                    </Button>
                    <Button  className="min-w-[250px]">
                        YC Client
                    </Button>
                    <Button  className="min-w-[250px]">
                        YC Rep
                    </Button>
                    <Button  className="min-w-[250px]">
                        YC Complete
                    </Button>
                </div>
                
                
            </div>
            
        </div>
    )
}