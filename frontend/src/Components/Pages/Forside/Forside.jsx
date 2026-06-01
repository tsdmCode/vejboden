import style from "./Forside.module.scss";
import SearchField from "../../SearchBar/SearchField";
import { Cards } from "../../Cards/Cards";


export default function Forside() {
return (
    <div className={style.cardscontent}>
    <div className={style.Headertxt}>
        <h3>Vejboden</h3>
        <h2>Find Din nærmeste Vejbod</h2>
        <h4>Lokale sælgere nær dig</h4>
        <SearchField/>
    </div>
        <Cards/>
    </div>

    
    

);
}