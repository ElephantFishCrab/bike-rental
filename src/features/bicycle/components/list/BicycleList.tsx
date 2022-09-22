import React from 'react';
import {Bicycle} from "../../entity/Bicycle";
import BicycleItem from "../item/BicycleItem";
import './bicyclelist.scss';

interface BicycleListProps {
    bicycles: Array<Bicycle | undefined>
    title?: string
}

const templateName = 'bicycle-list';

function BicycleList(props: BicycleListProps) {
    if (props.bicycles.length > 0) {
        return (
            <div className={templateName}>

                {/* Title */}
                { templateName && <h2 className={templateName + '__title'}>{props.title}</h2> }

                {/* Wrapper */}
                <div className={templateName + '__wrapper'}>
                    { props.bicycles.map( bicycle => {
                        return bicycle instanceof Bicycle && (
                            <BicycleItem key={bicycle?.getId()} bicycle={bicycle}/>
                        )
                    })}
                </div>
            </div>
        );
    } else {
        return <p>No bicycles available :(</p>
    }
}

export default BicycleList;