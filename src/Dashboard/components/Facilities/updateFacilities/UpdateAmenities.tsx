/* eslint-disable prettier/prettier */
import { Button, Checkbox } from 'antd';
import { useEffect, useState } from 'react';
import { ApiClientPrivate } from '../../../../utils/axios';
import { setAmenitiesUpdateBtn } from '../../../Redux/Features/updateFacilityBtn';
import { useAppDispatch } from '../../../Redux/hooks';

interface Amenity {
  key: string;
  name: string;
  _id: string;
  icon: string;
}

const UpdateAmenities = (props: any) => {
  console.log({ props });

  const [selectedTypes, setSelectedTypes] = useState<{ [key: string]: string | null }>(() => {
    const initialSelectedTypes: { [key: string]: string | null } = {};

    // Set initial values based on props.facilityData.amenities
    props.facilityData.amenities.forEach((amenity: any) => {
      initialSelectedTypes[amenity.amenities_name] = amenity.isPaid;
    });

    return initialSelectedTypes;
  });

  const [amentyData, setAmentyData] = useState<Amenity[]>([]);
  const dispatch = useAppDispatch();
  console.log('..', amentyData);

  const fetchData = async () => {
    try {
      const res = await ApiClientPrivate.get('/amenities');
      const test = res.data.includes(props.facilityData.amenities);
      console.log('test1 >>>>', test);
      const filteredData = res.data.filter((item:any) => item.status === true);
      setAmentyData(filteredData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [props]);

  const handleTypeChange = (name: string, type: string) => {
    setSelectedTypes((prevSelectedTypes) => {
      const updatedTypes = {
        ...prevSelectedTypes,
        [name]: prevSelectedTypes[name] === type ? null : type
      };

      // Remove entry if both checkboxes are unchecked
      if (!updatedTypes[name]) {
        delete updatedTypes[name];
      }

      return updatedTypes;
    });
  };

  console.log('selected Type :', selectedTypes);
  console.log('amentyData :', amentyData);

  const handleUpdate = async () => {
    try {
      const id = props.facilityData._id;
      const updates = amentyData
        .filter((item) => selectedTypes.hasOwnProperty(item.name))
        .map((item) => ({
          amenities_name: item.name,
          isPaid: selectedTypes[item.name],
          iconUrl: item.icon
        }));

      await ApiClientPrivate.put(`facilities/update/${id}`, { amenities: updates });

      // Dispatch action to update Redux state
      props.cancel();
      dispatch(setAmenitiesUpdateBtn(true));
    } catch (error) {
      console.error('Error updating facility:', error);
      // Handle error appropriately
    }
  };

  return (
    <div className="">
      <div className="p-10">
        {/* <AmenitiesForm/> */}
        {amentyData.map((item) => (
          <div
            key={item._id}
            className="amentiesCheckBox flex bg-white mb-3 rounded-md shadow-md p-4 justify-between hover:bg-slate-100"
          >
            <div className="w-[150px] md:w-[200px] flex items-center gap-3">
              <img src={`${item.icon}`} alt="" className="w-5" />
              {item.name}
            </div>
            <div className="flex items-center gap-3 ">
              <div className="PaidSection">Free</div>
              <Checkbox
                checked={selectedTypes[item.name] === 'free'}
                onChange={() => handleTypeChange(item.name, 'free')}
              ></Checkbox>
            </div>
            <div className="flex items-center gap-3 ">
              <div className="PaidSection">Paid</div>
              <Checkbox
                // defaultChecked=""
                checked={selectedTypes[item.name] === 'paid'}
                onChange={() => handleTypeChange(item.name, 'paid')}
              ></Checkbox>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <Button type="primary" htmlType="submit" className="bg-black rounded-none" onClick={handleUpdate}>
          Update
        </Button>
      </div>
    </div>
  );
};

export default UpdateAmenities;
