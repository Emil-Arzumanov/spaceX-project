import React from 'react';
import rightMenuStyle from "./rightMenu.module.css";
import arrowLeft from "../../imgs/Arrow_Left.png"
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {
    checkIfChosen,
    chosePort,
    closeFilter, combineAllFilters, setMaxPages, updateSearchFilter,
    updateSelector,
    updateShipTypeFilter
} from "../../store/reducers/shipsList-reducer";
import chevronUp from "../../imgs/Chevron_Up.png";
import chevronDown from "../../imgs/Chevron_Down.png";
import checkBoxYes from "../../imgs/CheckBox_Yes.png";
import checkBoxNo from "../../imgs/CheckBox_No.png";
import radioButtonNo from "../../imgs/RadioButton_No.png";
import radioButtonYes from "../../imgs/RadioButton_Yes.png";
import {RootState} from "../../store/store";

const RightMenu = () => {
    const dispatch = useAppDispatch();
    const shipsList = useAppSelector((state: RootState) => state.shipsList);

    const combineDispatches = (reducer: Function,data:string | EventTarget & HTMLInputElement) => {
        dispatch(reducer(data));
        dispatch(combineAllFilters());
        dispatch(setMaxPages());
    };

    return (
        <div className={rightMenuStyle.mainWrapper}>
            <div className={rightMenuStyle.backToShips}
                 onClick={() => dispatch(closeFilter())}
            >
                <img src={arrowLeft} alt=""/>
                <div>Фильтры</div>
            </div>
            <div className={rightMenuStyle.searchInpt}>
                <span>Название</span>
                <input type="search"
                       value={shipsList.searchFilter}
                       onChange={(e) => {
                           combineDispatches(updateSearchFilter, e.target.value);
                       }}
                />
            </div>
            <div>
                <span>Порт</span>
                <div className={rightMenuStyle.selectWrapper}>
                    <div className={rightMenuStyle.selectorWrapper}>
                        <div className={rightMenuStyle.selector} onClick={() => dispatch(updateSelector())}>
                            Выбрано {shipsList.chosenPorts.length}
                            <img src={shipsList.isSelectorOpen
                                ? chevronUp
                                : chevronDown}
                                 alt=""
                            />
                        </div>
                    </div>
                    <div className={shipsList.isSelectorOpen
                        ? rightMenuStyle.selectOptions
                        : rightMenuStyle.selectOptionsClosed}
                    >
                        <div onClick={() => {
                            combineDispatches(chosePort, "Port Canaveral");
                        }}>
                            <img src={checkIfChosen(shipsList.chosenPorts,"Port Canaveral")
                                ? checkBoxYes
                                : checkBoxNo}
                                 alt=""
                            />
                            <span>Port Canaveral</span>
                        </div>
                        <div onClick={() => {
                            combineDispatches(chosePort, "Port of Los Angeles");
                        }}>
                            <img src={checkIfChosen(shipsList.chosenPorts, "Port of Los Angeles")
                                ? checkBoxYes
                                : checkBoxNo}
                                 alt=""
                            />
                            <span>Port of Los Angeles</span>
                        </div>
                        <div onClick={() => {
                            combineDispatches(chosePort, "Fort Lauderdale");
                        }}>
                            <img src={checkIfChosen(shipsList.chosenPorts, "Fort Lauderdale")
                                ? checkBoxYes
                                : checkBoxNo}
                                 alt=""
                            />
                            <span>Fort Lauderdale</span>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <span>Тип</span>
                <div className={rightMenuStyle.typesRadio}>
                    <div onClick={() => {
                        combineDispatches(updateShipTypeFilter, "Barge");
                    }}>
                        <img src={shipsList.shipTypeFilter === "Barge"
                            ? radioButtonYes
                            : radioButtonNo}
                             alt=""
                        />
                        <span>Barge</span>
                    </div>
                    <div onClick={() => {
                        combineDispatches(updateShipTypeFilter, "Cargo");
                    }}>
                        <img src={shipsList.shipTypeFilter === "Cargo"
                            ? radioButtonYes
                            : radioButtonNo}
                             alt=""
                        />
                        <span>Cargo</span>
                    </div>
                    <div onClick={() => {
                        combineDispatches(updateShipTypeFilter, "High Speed Craft");
                    }}>
                        <img src={shipsList.shipTypeFilter === "High Speed Craft"
                            ? radioButtonYes
                            : radioButtonNo}
                             alt=""
                        />
                        <span>High Speed Craft</span>
                    </div>
                    <div onClick={() => {
                        combineDispatches(updateShipTypeFilter, "Tug");
                    }}>
                        <img src={shipsList.shipTypeFilter === "Tug"
                            ? radioButtonYes
                            : radioButtonNo}
                             alt=""
                        />
                        <span>Tug</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RightMenu;