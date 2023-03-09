import Image from 'next/image'
import slide3ImageSrc from '../../public/images/lp/12291063_Happy girl wearing headphones.jpg'
import slide2ImageSrc from '../../public/images/lp/16159876_5699593.jpg'
import slide1ImageSrc from '../../public/images/lp/27637698_7354075.jpg'

import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/splide/dist/css/themes/splide-default.min.css'

import styles from './LpSlider.module.scss'

export interface ILpSlider {
  dir: string
  splideAriaLabel: string
  slide1ImageAlt: string
  slide1Title: string
  slide1Description: string
  slide2ImageAlt: string
  slide2Title: string
  slide2Description: string
  slide3ImageAlt: string
  slide3Title: string
  slide3Description: string
}

const LpSlider: React.FC<ILpSlider> = ({
  dir,
  splideAriaLabel,
  slide1ImageAlt,
  slide1Title,
  slide1Description,
  slide2ImageAlt,
  slide2Title,
  slide2Description,
  slide3ImageAlt,
  slide3Title,
  slide3Description,
}) => {
  return (
    <Splide
      tag="section"
      aria-label={splideAriaLabel}
      options={{
        type: 'loop',
        // ts ignore is needed because of a bug in the splidejs library
        // @ts-ignore
        direction: `${dir}`,
        perPage: 1,
        perMove: 1,
        lazyLoad: false,
        width: '100%',
        pagination: true,
        arrows: false,
        autoplay: false,
        interval: 5000,
        breakpoints: {
          768: { autoplay: false },
        },
      }}
    >
      <SplideSlide className={styles.slide}>
        <div className={styles.image}>
          <Image src={slide1ImageSrc} alt={slide1ImageAlt} fill={true} />
        </div>
        <div className={styles.content}>
          <h1 className={styles.title}>{slide1Title}</h1>
          <p className={styles.description}>{slide1Description}</p>
        </div>
      </SplideSlide>
      <SplideSlide className={styles.slide}>
        <div className={styles.image}>
          <Image src={slide2ImageSrc} alt={slide2ImageAlt} fill={true} />
        </div>
        <div className={styles.content}>
          <h1 className={styles.title}>{slide2Title}</h1>
          <p className={styles.description}>{slide2Description}</p>
        </div>
      </SplideSlide>
      <SplideSlide className={styles.slide}>
        <div className={styles.image}>
          <Image src={slide3ImageSrc} alt={slide3ImageAlt} fill={true} />
        </div>
        <div className={styles.content}>
          <h1 className={styles.title}>{slide3Title}</h1>
          <p className={styles.description}>{slide3Description}</p>
        </div>
      </SplideSlide>
    </Splide>
  )
}

export default LpSlider
