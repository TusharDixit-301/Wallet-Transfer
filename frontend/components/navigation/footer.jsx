function Footer() {
	return (
		<div className="">
			<div className="flex justify-center items-end text-center mt-5 ">
				<h4 className=" text-blue-500 font-semibold">
					© 2023-2024 All rights reserved | Build with{' '}
					<text className='text-red-600 hover:text-red-600 cursor-pointer text-lg "'>
						{' '}
						&nbsp; ❤ &nbsp;
					</text>
					by
					<span className="hover:text-blue-800 font-semibold cursor-pointer">
						<a href="#">&nbsp;Tushar Dixit</a>
					</span>
				</h4>
			</div>
		</div>
	);
}

export default Footer;
