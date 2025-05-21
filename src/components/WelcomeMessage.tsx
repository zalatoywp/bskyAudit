import React from 'react';

const WelcomeMessage: React.FC = () => {
  return (
    <div className="justify-self-center w-fit mx-auto">
      <div className="bg-[rgb(21,24,24)] border-solid border border-white text-white rounded-[20px] mt-[20px] p-[20px] pt-[20px] m-[50px] transition-all duration-300 hover:shadow-[0_0_15px_rgba(85,178,240,0.5)]">
        <h3 className="text-center">¿ERES UN FISGÓN?</h3>
        <p className="text-center">Proyecto chorra de BSKY Social que no sirve para nada</p>
      </div>
    </div>
  );
};

export default WelcomeMessage;