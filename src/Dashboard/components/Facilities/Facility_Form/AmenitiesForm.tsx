/* eslint-disable prettier/prettier */
import { Button, Checkbox, Modal } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ApiClientPrivate } from '../../../../utils/axios';
import { nextButton, prevButton } from '../../../Redux/Features/ButtonSlice';
import { setAmenties } from '../../../Redux/Features/FacilityFeature/FacilititySlice';
import { useAppSelector } from '../../../Redux/hooks';
import AddAmenities from '../../Amenities/AddAmenities';
import { useQuery } from 'react-query';

interface Amenity {
  key: string;
  name: string;
  _id: string;
}

const AmenitiesForm = () => {
  const [selectedTypes, setSelectedTypes] = useState<{ [key: string]: string | null }>({});
  const { amenities } = useAppSelector((state) => state.facility);
  const [isModalVisible, setIsModalVisible] = useState(false);
  // console.log({ amenities, selectedTypes });

  const dispatch = useDispatch();

  const handleNext = () => {
    dispatch(nextButton());
  };

  const handlePrevious = () => {
    dispatch(prevButton());
  };

  const [amentyData, setAmentyData] = useState<Amenity[]>([]);

  const fetchAmenity = () => {
    return ApiClientPrivate.get(`/amenities`);
    // return response;
  };
  const { data: mainData, refetch } = useQuery('fetchAmenity', fetchAmenity);

  useEffect(()=>{
    const initialSelectedTypes: { [key: string]: string | null } = {};
      mainData?.data.forEach((item: any) => {
        initialSelectedTypes[item.name] = null;
      });
      setSelectedTypes(initialSelectedTypes);
      const filteredData = mainData?.data.filter((item:any) => item.status === true);
      setAmentyData(filteredData);
  },[mainData,refetch]);

  useEffect(()=>{
    refetch();
  },[isModalVisible, refetch])
  // const fetchData = async () => {
  //   try {
  //     const res = await ApiClientPrivate.get('/amenities');
  //     const initialSelectedTypes: { [key: string]: string | null } = {};
  //     res.data.forEach((item: any) => {
  //       initialSelectedTypes[item.name] = null;
  //     });
  //     setSelectedTypes(initialSelectedTypes);
  //     setAmentyData(res.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  const handleTypeChange = (name: string, iconUrl: string, type: string, e: any) => {
    setSelectedTypes((prevSelectedTypes) => ({
      ...prevSelectedTypes,
      [name]: prevSelectedTypes[name] === type ? null : type
    }));
    // console.log("check",e.target.checked);

    // Dispatch your action accordingly
    if ((type === 'free' && e.target.checked) || (type === 'paid' && e.target.checked)) {
      dispatch(setAmenties({ amenities_name: name, isPaid: type, iconUrl: iconUrl }));
    } else {
      dispatch(setAmenties({ amenities_name: name, Paid: e.target.checked, iconUrl: iconUrl }));
    }
  };

  return (
    <div className="max-w-[500px] mx-auto mt-8">
      <div className="font-semibold flex justify-between text-start font-montserrat text-2xl mb-10">
        <h1>Amenities</h1>
        <button
          className="bg-black font-montserrat text-xs rounded-none px-3 text-white "
          onClick={() => setIsModalVisible(true)}>
          {' '}
          Add
        </button>
      </div>

      {amentyData?.map((item: any) => (
        <div
          key={item._id}
          className="amentiesCheckBox flex bg-white mb-3 rounded-none shadow-md p-4 justify-between hover:bg-slate-100">
          <div className="w-[150px] md:w-[200px] flex items-center font-montserrat text-[#7E7E7E] gap-3">
            <img src={`${item.icon}`} alt="icon" className="w-5" />
            {item.name}
          </div>
          <div className="flex items-center gap-3 ">
            <div className="PaidSection font-montserrat text-[#7E7E7E]">Free</div>
            <Checkbox
              checked={
                (amenities.length > 0 &&
                  amenities?.find((it) => it.amenities_name == item.name)?.isPaid === 'free') ||
                selectedTypes[item.name] === 'free'
              }
              onChange={(e: any) => handleTypeChange(item.name, item.icon, 'free', e)}></Checkbox>
          </div>
          <div className="flex items-center gap-3 ">
            <div className="PaidSection font-montserrat text-[#7E7E7E]">Paid</div>
            <Checkbox
              checked={
                (amenities.length > 0 &&
                  amenities?.find((it) => it.amenities_name == item.name)?.isPaid === 'paid') ||
                selectedTypes[item.name] === 'paid'
              }
              onChange={(e: any) => handleTypeChange(item.name, item.icon, 'paid', e)}></Checkbox>
          </div>
        </div>
      ))}
      <div className="flex gap-3 justify-center mt-10">
        <Button className="bg-white font-montserrat rounded-none" onClick={handlePrevious}>
          Previous
        </Button>
        <Button className="bg-black font-montserrat rounded-none text-white " onClick={handleNext}>
          Next
        </Button>
      </div>
      {/* Add modal */}
      <Modal
        title=""
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={false}>
        <AddAmenities modalClose={setIsModalVisible} />
      </Modal>
    </div>
  );
};

export default AmenitiesForm;
