import React, { useState } from 'react'
import styles from "./Home.module.css";
import Site from '../components/Site';
import Electrician from '../components/Electrician';
import rawSites from "../store/site.json";
import rawElectricians from "../store/electricians.json";

const Home = () => {
    const [sites, setSites] = useState(rawSites);
    const [electricians, setElectricians] = useState(rawElectricians);
    const date = new Date();

    const handleAssignElectricians = () => {
        const allElectricians = electricians;

        // auto-assign the site to the electrician
        const grievanceElectricians = allElectricians.filter((electrician) => electrician.grievanceElectrician);
        const generalElectricians = allElectricians.filter((electrician) => !electrician.grievanceElectrician);

        grievanceElectricians.forEach((electrician) => electrician.assignment = 0);
        generalElectricians.forEach((electrician) => electrician.assignment = 0);
        let electricianIndex = 0;
        let generalElectricianIndex = 0;

        const updatedSites = [];
        for (let i = 0; i < sites.length; i++) {
            updatedSites.push(sites[i]);
            const site = sites[i];
            if (!sites[i].grievance) {
                if (generalElectricianIndex >= generalElectricians.length) {
                    generalElectricianIndex = 0;
                }

                if (generalElectricians[generalElectricianIndex].assignment < 3) {
                    // assign the electrician to the site
                    site.AssignedElectritian.push({
                        electricianName: generalElectricians[generalElectricianIndex].name,
                        electricianAssignDate: `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
                    });
                    generalElectricians[generalElectricianIndex].assignment++;
                }

                generalElectricianIndex++;
            }
            else {
                if (electricianIndex >= grievanceElectricians.length) {
                    electricianIndex = 0;
                }

                if (grievanceElectricians[electricianIndex].assignment < 3) {
                    // assign the electrician to the site
                    site.AssignedElectritian.push({
                        electricianName: grievanceElectricians[electricianIndex].name,
                        electricianAssignDate: `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
                    });
                    grievanceElectricians[electricianIndex].assignment++;
                } else {
                    const availableGeneralElectrician = generalElectricians.filter((electrician) => electrician.assignment < 3);
                    // console.log("AVAIL", availableGeneralElectrician);
                    if (availableGeneralElectrician.length) {
                        site.AssignedElectritian.push({
                            electricianName: availableGeneralElectrician[0].name,
                            electricianAssignDate: `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
                        });
                        availableGeneralElectrician[0].assignment++;
                    }
                }

                electricianIndex++;
            }

        }
        // console.log("GENERAL", generalElectricians.filter(ele => ele.assignment > 3));
        // console.log("GRIEVANCE", grievanceElectricians.filter(ele => ele.assignment > 3))
        console.log("Assigned Sites ====>>>", updatedSites);
        setSites(updatedSites);
    }

    // console.log(">>>>", sites);
    // console.log("YOOO++++>>>>>", sites.filter(site => site.AssignedElectritian.length))

    return (
        <div className={ styles.Home }>
            <div className={ styles.actions }>
                <h4>Installation Sites</h4>
                <button
                    className={ styles.assign__btn }
                    onClick={ handleAssignElectricians }
                >Auto Assign
                </button>
            </div>
            <main>
                <div className={ styles.sites }>
                    { sites?.map(site => <Site key={ site.phone + site.name } data={ site } />) }
                </div>

            </main>
            <h4>Electricians</h4>
            <section>
                <div className={ styles.electricians }>
                    { electricians?.map(electrician => <Electrician key={ electrician.phone + electrician.name } data={ electrician } />) }
                </div>
            </section>
        </div>
    )
}

export default Home;