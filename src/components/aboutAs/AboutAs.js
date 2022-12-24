import './AboutAsPage.css'
import VideoWebm from "../../video/aboutAs.webm";
import VideoMp4 from "../../video/aboutAs.mp4";


export function AboutAs() {
    return (
        <div>
            <h1 className={'about-h1'}>Хто ми такі</h1>

            <div className={'flex-history about-non-margin'}>
                <div>
                    <video controls muted loop preload={'auto'} className={'about-video-item'}>
                        <source src={VideoWebm} type={'video/webm'}/>
                        <source src={VideoMp4} type={'video/mp4'}/>
                    </video>
                </div>
                <div className={'about-p-full'}>
                    <p className={''}>Lorem ipsum dolor sit amet, eu soleat causae virtute vix. Ut dicant labores pro.
                        Lorem ipsum dolor sit amet, eu soleat causae virtute vix. Ut dicant labores pro.</p>
                    <p className={''}>Lorem ipsum dolor sit amet, eu soleat causae virtute vix. Ut dicant labores pro. </p>

                </div>
            </div>
        </div>
    );
}
