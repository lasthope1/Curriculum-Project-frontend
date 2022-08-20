import {useState} from 'react';
import styled from 'styled-components';
import '../../styles/SearchBar.css';

import {DataResult, StudentData} from '../interfaces/InfOther';

const TopWrapper = styled.nav`
    background: #674B91;
    position: fixed;
    width: 100%;
    height: var(--nav-size);
    display: flex;
    padding: 10px 32px;
    align-items: center;
    justify-content: space-between;
    border-bottom: var(--border);
    
    top: 0px;
    left: 0px;
`;

export default function TopBar(param: {placeholder: string, data: DataResult}) {
    const [filteredData, setFilteredData] = useState(Array<object>());

    const handleFilter = (searchWord: string) => {
        if(searchWord !== ""){
            const newFilter = param.data.Data.filter(({name}: StudentData) => {
                return name.includes(searchWord);
            })
            setFilteredData(newFilter)
        }else{
            setFilteredData([])
        }
    }

  return (
    <TopWrapper>
        <div className="searchWrapper">
            <div className="searchInputs">
                <input type="text" placeholder={param.placeholder} 
                    onChange={(event) => handleFilter(event.target.value)}/>
                {/* <div className="searchIcon"></div> */}
            </div>
            { filteredData.length !== 0 && (
                    <div className="dataResult">
                        { filteredData.map(({name}: any) => {
                                return ( 
                                    <div className="dataItem">
                                        <p>{name}</p>
                                    </div>
                                );
                            })
                        }
                    </div>
                )
            }
        </div>
        <div className="Prof-area">
            <i>This is profile area</i>
        </div>
    </TopWrapper>
  )
}
