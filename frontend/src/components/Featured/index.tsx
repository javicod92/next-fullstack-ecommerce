export default function Featured() {
  return (
    <div className="flex justify-center bg-zinc-800 text-white py-[50px]">
      {/* The div below is the component center */}
      <div className="max-w-[800px] grow p-5">
        <div className="grid grid-cols-2">
          <div className="flex flex-col justify-center">
            <h1>Pro anywhere</h1>
            <p className="text-[#aaa] mt-4">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quod
              tenetur eaque nam, sint necessitatibus eius quia sapiente.
              Sapiente id voluptates qui ipsam, voluptatibus quibusdam porro
              iste quisquam cum eligendi illum.
            </p>
          </div>
          <div>
            <img
              src="D_NQ_NP_830299-MLA79635564046_102024-O.webp"
              alt="Product"
              className="max-w-full contrast-125 drop-shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
