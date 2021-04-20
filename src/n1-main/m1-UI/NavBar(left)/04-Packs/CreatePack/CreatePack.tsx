import SuperButtonOld from "../../../Common/InputAndButton/с2-SuperBottonOld/SuperButtonOld";
import {useDispatch, useSelector} from "react-redux";
import {addPackTC, textCreateNamePackAC} from "../../../../m2-BLL/05-reducer-packs/reducer-packs";
import {AppStateType} from "../../../../m2-BLL/00-store/store";
import SuperInputTextOld from "../../../Common/InputAndButton/c1-SuperInputTextOld/SuperInputTextOld";


export const CreatePack = () => {
    const dispatch = useDispatch()
    let name = useSelector<AppStateType,string>(state => state.packs.name)
    let type = useSelector<AppStateType,string>(state => state.packs.type)
    // name: string, path: string, grade: number, shots: number,
    //     rating: number, deckCover: string, isPrivate: boolean,
    //     type: string
    const CreatePack = () =>{
        dispatch(addPackTC(name,'',0,0,0,'',false,type))
    }
    const TextCreatePack = (name:string) =>{
        dispatch(textCreateNamePackAC(name))
    }

    return (
        <div>
           <div style={{fontSize:'20px',color:'white',fontWeight:600}}>Name</div>
            <SuperInputTextOld  onChangeText={TextCreatePack}/>
            <SuperButtonOld  title={'Create  Pack'} onClick={CreatePack}/>
        </div>
    )
}