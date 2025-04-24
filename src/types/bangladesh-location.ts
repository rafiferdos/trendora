
type ThanaList = string[];

interface DistrictMap {
  [district: string]: ThanaList;
}

interface DivisionData {
  districts: DistrictMap;
}

interface BangladeshLocations {
  [division: string]: DivisionData;
}


export const bangladeshLocations: BangladeshLocations  = {
  "Barisal": {
      districts: {
        "Barguna": ["Amtali", "Bamna", "Barguna Sadar", "Betagi", "Patharghata"],
        "Barisal": ["Barisal Sadar", "Agailjhara", "Babuganj", "Bakerganj", "Banaripara", "Gaurnadi", "Hizla", "Mehendiganj", "Muladi"],
        "Bhola": ["Bhola Sadar", "Borhanuddin", "Charfesson", "Daulatkhan", "Lalmohan", "Manpura", "Tazumuddin"],
        "Jhalokati": ["Jhalokati Sadar", "Kathalia", "Nalchity", "Rajapur"],
        "Patuakhali": ["Patuakhali Sadar", "Bauphal", "Dashmina", "Dumki", "Galachipa", "Kalapara", "Mirzaganj", "Rangabali"],
        "Pirojpur": ["Pirojpur Sadar", "Mathbaria", "Bhandaria", "Nazirpur", "Kawkhali", "Nesarabad", "Indurkani"]
      }
    },
    "Chittagong": {
      districts: {
        "Bandarban": ["Alikadam", "Bandarban Sadar", "Lama", "Naikhongchhari", "Rowangchhari", "Ruma", "Thanchi"],
        "Brahmanbaria": ["Akhaura", "Bancharampur", "Brahmanbaria Sadar", "Kasba", "Nabinagar", "Nasirnagar", "Sarail"],
        "Chandpur": ["Chandpur Sadar", "Faridganj", "Haimchar", "Hajiganj", "Kachua", "Matlab", "Shahrasti"],
        "Chittagong": ["Anwara", "Banshkhali", "Boalkhali", "Chandanaish", "Fatikchhari", "Hathazari", "Kotwali", "Pahartali", "Patiya"],
        "Cox's Bazar": ["Cox's Bazar Sadar", "Chakaria", "Kutubdia", "Maheshkhali", "Pekua", "Ramu", "Teknaf", "Ukhia"],
        "Comilla": ["Comilla Sadar", "Barura", "Brahmanpara", "Burichang", "Chandina", "Chauddagram", "Daudkandi", "Debidwar"],
        "Khagrachhari": ["Dighinala", "Khagrachhari Sadar", "Lakshmichhari", "Mahalchhari", "Manikchhari", "Matiranga", "Panchhari", "Ramgarh"],
        "Lakshmipur": ["Lakshmipur Sadar", "Raipur", "Ramganj", "Ramgati"],
        "Noakhali": ["Noakhali Sadar", "Begumganj", "Chatkhil", "Companiganj", "Hatiya", "Senbagh", "Sonaimuri", "Subarnachar"],
        "Feni": ["Feni Sadar", "Chhagalnaiya", "Daganbhuiyan", "Parshuram", "Sonagazi"],
        "Rangamati": ["Rangamati Sadar", "Baghaichhari", "Barkal", "Kawkhali", "Kaptai", "Juraichhari", "Langadu", "Naniarchar"]
      }
    },
    "Dhaka": {
      districts: {
        "Dhaka": ["Dhanmondi", "Gulshan", "Mirpur", "Mohammadpur", "Uttara", "Banani", "Tejgaon", "Savar", "Keraniganj", "Dohar"],
        "Gazipur": ["Gazipur Sadar", "Kaliakair", "Kapasia", "Kaliganj", "Sreepur"],
        "Narayanganj": ["Narayanganj Sadar", "Araihazar", "Bandar", "Rupganj", "Sonargaon"],
        // "Tangail": ["Tangail Sadar", "Basail", "Bhuapur", "Delduar", "Ghatail", "Gopalpur", "Kalihati", "Madhupur", "Mirzapur"],
        "Narsingdi": ["Narsingdi Sadar", "Belabo", "Monohardi", "Palash", "Raipura", "Shibpur"],
        "Munshiganj": ["Munshiganj Sadar", "Gazaria", "Lohajang", "Sirajdikhan", "Sreenagar", "Tongibari"],
        "Manikganj": ["Manikganj Sadar", "Daulatpur", "Ghior", "Harirampur", "Saturia", "Shibalaya", "Singair"],
        "Faridpur": ["Alfadanga", "Bhanga", "Boalmari", "Char Bhadrasan", "Faridpur Sadar", "Madhukhali", "Nagarkanda", "Sadarpur"],
        "Gopalganj": ["Gopalganj Sadar", "Kashiani", "Kotalipara", "Muksudpur", "Tungipara"],
        "Madaripur": ["Kalkini", "Madaripur Sadar", "Rajoir", "Shibchar"],
        "Shariatpur": ["Bhedarganj", "Damudya", "Gosairhat", "Naria", "Shariatpur Sadar", "Zanjira"],
        "Tangail": ["Basail", "Bhuapur", "Delduar", "Ghatail", "Gopalpur", "Kalihati", "Madhupur", "Mirzapur", "Nagarpur", "Sakhipur", "Tangail Sadar"],
        "Rajbari": ["Baliakandi", "Goalandaghat", "Pangsha", "Rajbari Sadar"],
        "Kishoreganj": ["Kishoreganj Sadar", "Austagram", "Bajitpur", "Bhairab", "Hossainpur", "Itna", "Karimganj", "Katiadi"]
      }
    },
 
    "Khulna": {
      districts: {
        "Khulna": ["Khulna Sadar", "Batiaghata", "Dacope", "Dumuria", "Dighalia", "Koyra", "Paikgachha", "Phultala", "Rupsa", "Terokhada"],
        "Jessore": ["Jessore Sadar", "Abhaynagar", "Bagherpara", "Chaugachha", "Jhikargachha", "Keshabpur", "Manirampur", "Sharsha"],
        "Satkhira": ["Satkhira Sadar", "Assasuni", "Debhata", "Kalaroa", "Kaliganj", "Shyamnagar", "Tala"],
        "Bagerhat": ["Bagerhat Sadar", "Chitalmari", "Fakirhat", "Kachua", "Mollahat", "Mongla", "Morrelganj", "Rampal", "Sarankhola"],
        "Chuadanga": ["Alamdanga", "Chuadanga Sadar", "Damurhuda", "Jibannagar"],
        "Jhenaidah": ["Harinakunda", "Jhenaidaha Sadar", "Kaliganj", "Kotchandpur", "Maheshpur", "Shailkupa"],
        "Kushtia": ["Bheramara", "Daulatpur", "Khoksa", "Kumarkhali", "Kushtia Sadar", "Mirpur"],
        "Magura": ["Magura Sadar", "Mohammadpur", "Salikha", "Sreepur"],
        "Meherpur": ["Gangni", "Meherpur Sadar"],
        "Narail": ["Kalia", "Lohagara", "Narail Sadar"]
      }
    },
    "Mymensingh": {
      districts: {
        "Mymensingh": ["Mymensingh Sadar", "Bhaluka", "Dhobaura", "Fulbaria", "Gafargaon", "Gauripur", "Haluaghat", "Ishwarganj"],
        "Jamalpur": ["Jamalpur Sadar", "Bakshiganj", "Dewanganj", "Islampur", "Madarganj", "Melandaha", "Sarishabari"],
        "Netrokona": ["Netrokona Sadar", "Atpara", "Barhatta", "Durgapur", "Kalmakanda", "Kendua", "Khaliajuri", "Madan"],
        "Sherpur": ["Sherpur Sadar", "Jhenaigati", "Nakla", "Nalitabari", "Sreebardi"]
      }
    },
    "Rajshahi": {
      districts: {
        "Chapai Nawabganj": ["Chapai Nawabganj Sadar", "Gomastapur", "Nawabganj", "Shibganj"],
        "Rajshahi": ["Boalia", "Motihar", "Rajpara", "Shah Makhdum", "Paba", "Godagari", "Tanore", "Bagmara", "Durgapur"],
        "Bogra": ["Bogra Sadar", "Adamdighi", "Dhunat", "Dupchanchia", "Gabtali", "Kahaloo", "Nandigram", "Shajahanpur", "Sherpur"],
        "Joypurhat": ["Akkelpur", "Joypurhat Sadar", "Kalai", "Khetlal", "Panchbibi"],
        "Sirajganj": ["Belkuchi", "Chauhali", "Kamarkhanda", "Kazipur", "Raiganj", "Shahjadpur", "Sirajganj Sadar", "Tarash", "Ullahpara"],
        "Pabna": ["Pabna Sadar", "Atgharia", "Bera", "Bhangura", "Chatmohar", "Faridpur", "Ishwardi", "Santhia", "Sujanagar"],
        "Natore": ["Natore Sadar", "Bagatipara", "Baraigram", "Gurudaspur", "Lalpur", "Singra"],
        "Naogaon": ["Naogaon Sadar", "Atrai", "Badalgachhi", "Dhamoirhat", "Manda", "Mohadevpur", "Niamatpur", "Patnitala", "Porsha"]
      }
    },
    "Rangpur": {
      districts: {
        "Rangpur": ["Rangpur Sadar", "Badarganj", "Gangachara", "Kaunia", "Mithapukur", "Pirgachha", "Pirganj", "Taraganj"],
        "Dinajpur": ["Dinajpur Sadar", "Birampur", "Birganj", "Bochaganj", "Chirirbandar", "Fulbari", "Ghoraghat", "Hakimpur"],
        "Kurigram": ["Kurigram Sadar", "Bhurungamari", "Chilmari", "Phulbari", "Nageshwari", "Rajarhat", "Raumari", "Ulipur"],
        "Lalmonirhat": ["Amtali", "Hatibandha", "Kaliganj", "Lalmonirhat Sadar", "Patgram"],
        "Nilphamari": ["Dimla", "Domar", "Jaldhaka", "Kishoreganj", "Nilphamari Sadar", "Saidpur"],
        "Panchagarh": ["Atrai", "Boda", "Debiganj", "Panchagarh Sadar", "Tentulia"],
        "Thakurgaon": ["Baliadangi", "Haripur", "Pirganj", "Ranisankail", "Thakurgaon Sadar"],
        "Gaibandha": ["Gaibandha Sadar", "Fulchhari", "Gobindaganj", "Palashbari", "Sadullapur", "Saghata", "Sundarganj"]
      }
    },
    "Sylhet": {
      districts: {
        "Sylhet": ["Sylhet Sadar", "Beanibazar", "Bishwanath", "Companiganj", "Fenchuganj", "Golapganj", "Gowainghat", "Jaintiapur"],
        "Moulvibazar": ["Moulvibazar Sadar", "Kamalganj", "Kulaura", "Rajnagar", "Sreemangal", "Juri", "Barlekha"],
        "Habiganj": ["Habiganj Sadar", "Ajmiriganj", "Bahubal", "Baniachong", "Chunarughat", "Lakhai", "Madhabpur", "Nabiganj"],
        "Sunamganj": ["Sunamganj Sadar", "Bishwamvarpur", "Chhatak", "Derai", "Dharampasha", "Dowarabazar", "Jagannathpur", "Jamalganj"]
      }
    },
    
  };
  // Helper function to get districts for a division
export const getDistricts = (division: string): string[] => {
    if (!division || !(division in bangladeshLocations)) {
      return [];
    }
    return Object.keys(bangladeshLocations[division].districts);
  };
  
  // Helper function to get thanas for a district in a division
  export const getThanas = (division: string, district: string): string[] => {
    if (!division || !district || !(division in bangladeshLocations)) {
      return [];
    }
    return bangladeshLocations[division].districts[district] || [];
  };
  
  // Add type guard for additional safety
  export const isDivision = (division: string): boolean => {
    return division in bangladeshLocations;
  };
  
  export const isDistrict = (division: string, district: string): boolean => {
    return isDivision(division) && district in bangladeshLocations[division].districts;
  };