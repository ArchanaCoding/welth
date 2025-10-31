import HeroSection from "@/components/hero";
import { statsData } from "@/data/landing";


export default function Home() {
  return (
 <div className="mt-40">
    <HeroSection />

{/* here we are rendering our data of landing page */}
    <section>
          <div>
            <div>
              {statsData.map((statsData, index)=>( // need parameters then only we can access data
                <div key={index}>
                  <div>{statsData.value}</div>
                  <div>{statsData.label}</div>
                </div>
              ))}
            </div>
          </div>
    </section>

 </div>
  );
}
