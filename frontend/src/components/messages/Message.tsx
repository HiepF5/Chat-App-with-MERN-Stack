
const Message = () => {


	return (
    <div className={`chat chat-end`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS chat bubble component"
            src="https://scontent.fhan14-1.fna.fbcdn.net/v/t39.30808-6/440930688_1937199140070869_6135654646379598488_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeH04TwSGZC0XkmEV1R7M9gwT4RUG_vDMcxPhFQb-8MxzK3kpVLgkH-F8-gB24H23zejolbD3R0whqbk9h520MpW&_nc_ohc=Xl_GK-NTfFYQ7kNvgGlED8b&_nc_oc=AdgJu74ySOnwpcF9avPHC8ueikIdZz8dh8Cs11AjRblEyuQYw7n00K-WLJmi4PxzEQc&_nc_zt=23&_nc_ht=scontent.fhan14-1.fna&_nc_gid=AUAFPl06Mu2u4Ka-vtTqoAN&oh=00_AYCSNSBAlZSqU6no7De-2bS9EHYm3d5rF4BWiGw1E4TEyw&oe=67C53C48"
          />
        </div>
      </div>
      <div
        className={`chat-bubble text-white bg-blue-500 pb-2`}
      >
        Hi. How are you?
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        12:42
      </div>
    </div>
  );
};
export default Message;
