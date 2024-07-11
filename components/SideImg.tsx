import Image from "next/image"

const SideImg = ({imgSrc, width}: {imgSrc:string, width:string}) => {
  return (
    <Image src={imgSrc}
    width={500}
    height={500}
    alt="sideimage"
    className={`side-img max-w-[${width}] rounded-lg`} priority />
  )
}

export default SideImg