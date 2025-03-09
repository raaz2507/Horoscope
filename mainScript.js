function main(){
	const baseObj= new numerlogyDomManupulater();
	baseObj.horoScopePlaceHide();
}
class numerlogyDomManupulater{
	constructor(){
		this.myform = document.getElementById("myForm");
		this.HoroscopePlace = document.getElementById("horoscope");
		this.DetailsDisplay = document.getElementById( "DetailsDisplay" );
		this.flip_Card = document.querySelector(".flipCard");
		this.front =document.querySelector(".front");
		
		//ditail dispaly element
		this.nameValue=document.getElementById("nameValue");
		this.dobValue= document.getElementById("dobValue");
		this.namankValue = document.getElementById("namankValue");
		this.mulyankValue = document.getElementById("mulyankValue");
		this.bhagyankValue= document.getElementById("bhagyankValue");
	}
	horoScopePlaceHide(){
		this.HoroscopePlace.style.display='none';
	}
	horsoScopePlaceShow(){
		this.HoroscopePlace.style.display='block';
	}
	
	flipCard(){
		this.flip_Card.style.transform='rotateX(180deg)'; // वापस Form दिखाएँ
		this.front.style.display='none';
	}
	addDetailsOnMagicCircle( usrDetailObj ){
		nameValue.innerText= usrDetailObj.name;
		dobValue.innerText= usrDetailObj.date;
		namankValue.innerText =usrDetailObj.mulyankByName;
		mulyankValue.innerText=usrDetailObj.mulyank;
		bhagyankValue.innerText=usrDetailObj.bhagyank;
		//peragraph.innerText = `नाम :${usrDetailObj.name}\n जन्म तिथि: ${ usrDetailObj.date}\n नामांक : ${usrDetailObj.mulyankByName}\n मूलांक : ${usrDetailObj.bhagyank}\n भाग्यांक : ${usrDetailObj.mulyank}`;
		//DetailsDisplay.appendChild(peragraph);
	}
	DetailsDisplayReset(){
		nameValue.innerText= "";
		dobValue.innerText= "";
		namankValue.innerText ="";
		mulyankValue.innerText="";
		bhagyankValue.innerText="";
	}
}




	myform.addEventListener("submit", (event) => {	main(event); });
/*
	DetailsDisplay.addEventListener('click', ()=>{
		flipCard();
		horsoScopePlaceShow();
	});
*/
DetailsDisplay.addEventListener('click', ()=>{
    if (flip_Card.style.transform === 'rotateX(180deg)') {
        flip_Card.style.transform = 'rotateX(0deg)'; // Flip back to form
        front.style.display = 'block';  // Show form again
        horoScopePlaceHide();
    } else {
        flipCard(); // Flip to details
        horsoScopePlaceShow();
    }
});

	
	function main(event) {
		event.preventDefault();
		const formData = new FormData(event.target);
		let name = formData.get("name").trim().toLowerCase();
		let dob = formData.get("dob");
		//console.log(`${name}, ${dob}`);
	
		let usrDetailObj = new numerlogyCalu(name, dob);
		usrDetailObj.printValue();
		if (dob !== "" && name !== "") {
			flipCard();

			addDetailsOnMagicCircle( usrDetailObj );
			printHoroscope(usrDetailObj);
			horsoScopePlaceShow();
		}else{
			DetailsDisplayReset();
			HoroscopePlace.innerText="";
		}
	}

	

	
	function createHoroscopeElement( title, text ) {
		const wapper = document.createElement("div");
		wapper.classList.add("horoContent");
		const hadding = document.createElement("h3");
		hadding.classList.add("horoTitle");
		hadding.innerText = title;

		const div = document.createElement("p");
		div.classList.add("horoPeragraph");
		div.appendChild(hadding);
		div.innerText = text;

		wapper.appendChild(hadding);
		wapper.appendChild(div);
		return wapper;
	}

	function printHoroscope( usrDetailObj ) {
		const df = document.createDocumentFragment();
		
		const horoTitle=document.createElement("h3");
		horoTitle.innerText = "आपका अंकज्योतिष रिपोर्ट";
		df.appendChild(horoTitle);
		
		df.appendChild( createHoroscopeElement("नामांक ", namankData[usrDetailObj.mulyankByName]) );
		df.appendChild( createHoroscopeElement("मूलांक", MulyankData[usrDetailObj.mulyank]));
		df.appendChild(	createHoroscopeElement("भाग्यांक ", BhagyankData[usrDetailObj.bhagyank])		);
		
		HoroscopePlace.innerHTML = "";
		HoroscopePlace.appendChild(df);
	}

	class myDate {
		constructor(dateStr) {
			this.year = dateStr.slice(0, 4);
			this.month = dateStr.slice(5, 7);
			this.day = dateStr.slice(8, 10);
			this.monthInWord=this.#monthInWord(this.month);
		}
		#monthInWord(month){
			const monthNames = { 1: "जनवरी", 2: "फरवरी", 3: "मार्च", 4: "अप्रैल", 5: "मई", 6: "जून", 7: "जुलाई", 8: "अगस्त", 9: "सितंबर", 10: "अक्टूबर", 11: "नवंबर", 12: "दिसंबर"};
			return monthNames[parseInt(month)];
		}
	}

	class numerlogyCalu {
		constructor(name, dob) {
			this.name = name;
			let date = new myDate(dob);
			this.date= this.#date(date);
			this.mulyankByName = this.#calc_Name(name);
			this.bhagyank = this.#calc_Bhayank(date);
			this.mulyank = this.#calc_Mulyank(date);
		}
		#date(date){
			return `${date.day}:${date.monthInWord}:${date.year}`;
		}
		#calc_Name(name) {
			let namNumVal = [];
			let SumNamVal = 0;

			for (let i = 0; i < name.length; i++) {
				namNumVal.push(name.charCodeAt(i) - 96);
				SumNamVal += namNumVal[namNumVal.length - 1];
			}

			this.nameArre = namNumVal;
			return this.#reduce2one(SumNamVal);
		}
		#calc_Mulyank(date) {
			let dateArre = [];

			[date.day, date.month, date.year].forEach((value) => {
				for (let i = 0; i < value.length; i++) {
					dateArre.push(parseInt(value[i]));
				}
			});

			this.dateArre = dateArre;
			return this.#reduce2one(dateArre.reduce((sum, num) => sum + num, 0));
		}
		#calc_Bhayank(date) {
			return this.#reduce2one(parseInt(date.day));
		}

		#reduce2one(num) {
			if (num > 9) {
				let sum = 0;
				while (num != 0) {
					sum += num % 10;
					num = parseInt(num / 10);
				}
				return this.#reduce2one(sum);
			}
			return num;
		}

		printValue() {
			console.log(`name [${this.nameArre}] num=${this.mulyankByName}`);
			console.log(
				`dob=[${this.dateArre.slice(0, 2)}] bhagyank=${this.bhagyank}`
			);
			console.log(`dob=[${this.dateArre}] mulyank =${this.mulyank}`);
		}
	}