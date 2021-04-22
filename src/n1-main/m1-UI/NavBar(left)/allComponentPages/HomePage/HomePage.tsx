import css from './HomePage.module.css'


export const HomePage = () =>{
    return (
        <div>
            <h2 className={css.style}>Welcome Ignat and friends from IT-Kamasutra
                <span className={css.style}> -WHOOSH - WHOOSH-</span> </h2>
            <div className={css.style}>
                <img   src="https://s.yimg.com/ny/api/res/1.2/JYrQrhIBeuaxqfi2bT_VJA--~A/YXBwaWQ9aGlnaGxhbmRlcjtzbT0xO3c9ODAw/http://media.zenfs.com/en/homerun/feed_manager_auto_publish_494/5cb9de25f0e1afc3cfab414c7b765179" alt="Welcome"/>
            </div>

        </div>
    )
}

