import React from 'react'
import FlashOnIcon from '@mui/icons-material/FlashOn';
import Image from 'next/image';

const Logo
 = () => {
  return (
    <div>
    <Image src={'/flashy.png'} width={165.54} height={80} alt="Flashy McFlasherson" /><div className="lightning"><FlashOnIcon fontSize="56rem"/></div><Image src={'/McFlasherson.png'} width={313.6} height={80} alt="Flashy McFlasherson" />
    {/* <div  className="italics" onClick={() => {}}><h1 className={lobsterTwo.className}>Flashy<div className="lightning"><FlashOnIcon fontSize="56rem"/></div>McFlasherson</h1></div> */}
    </div>
  )
}

export default Logo
