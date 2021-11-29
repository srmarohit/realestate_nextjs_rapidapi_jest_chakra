import { Avatar } from "@chakra-ui/avatar";
import { Box, Flex, Spacer, Text } from "@chakra-ui/layout";
import millify from "millify";
import { BsGridFill } from "react-icons/bs";
import { FaBath, FaBed } from "react-icons/fa";
import { GoVerified } from "react-icons/go";
import ImageScrollbar from "../../components/ImageScrollbar";
import { baseUrl, fetchApi } from "../../utils/fetchApi";



const PropertyDetails = ({propertyDetails : {price, rentFrequency, rooms, title, baths, area, agency, isVerified, description, type, purpose, furnishingStatus, amenities, photos}}) =>(
    <Box maxWidth='1000px' margin='auto' p="4">
        { photos && <ImageScrollbar data={photos} /> }
        <Box w='full' p='6'>
            <Flex paddingTop='2' alignItems='center'>
                  {/* verified price rentFrequency agency in one row */}
                <Box paddingRight='3' color='green.400'>
                    { isVerified && <GoVerified/> }
                </Box>
                <Text fontSize='lg' fontWeight='bold'>
                    AED {price} {rentFrequency  && `/${rentFrequency}`}
                </Text>
                <Spacer /> {/** provide space  */}
                <Avatar size='sm' src={agency?.logo?.url}></Avatar> {/*logo thumbnail of agency */}
            </Flex>
            {/** rooms baths area */}
            <Flex alignItems='center' p='1' justifyContent='space-between' alignItems='center' w='250px' color='blue.400'>
                {rooms}<FaBed/> | {baths}<FaBath/> | {millify(area)} sqft <BsGridFill/>
            </Flex>
        </Box>
        <Box marginTop='2'>
            {/** title and decription */}
            <Text fontWeight='bold' fontSize='lg' marginBottom='2'>{title}</Text>
            <Text lineHeight='2' color='gray.600'>{description}</Text>
        </Box>
        <Flex flexWrap='wrap' textTransform='uppercase' justifyContent='space-between'>
            {/** type purposes surnishing status */}
      <Flex justifyContent='space-between' w='400px' borderBottom='1px' borderColor='gray.100' p='3'>
        <Text>Type</Text>
        <Text fontWeight='bold'>{type}</Text>
      </Flex>
      <Flex justifyContent='space-between' w='400px' borderBottom='1px' borderColor='gray.100' p='3'>
        <Text>Purpose</Text>
        <Text fontWeight='bold'>{purpose}</Text>
      </Flex>
      {furnishingStatus && (
        <Flex justifyContent='space-between' w='400px' borderBottom='1px' borderColor='gray.100' p='3' >
          <Text>Furnishing Status</Text>
          <Text fontWeight='bold'>{furnishingStatus}</Text>
        </Flex>
      )}
    </Flex>
    {/** amenities */}
    <Box>
        {amenities.length && <Text fontSize='2xl' fontWeight='black' marginTop='5'>Facilities:</Text>}
        {/** amenities items */}
        <Flex flexWrap='wrap'>
            {
                amenities?.map(item => (
                    item?.amenities?.map(amenity => (
                        <Text key={amenity.text} fontWeight='bold' color='blue.400' fontSize='sm' p='2' bg='gray.200' m='1' borderRadius='5'>
                            {amenity.text} 
                        </Text>
                    ))
                ))
            }
        </Flex>
    </Box>
    </Box>
);

export default PropertyDetails ;


export async function getServerSideProps({params : {id}}){
    const data = await fetchApi(`${baseUrl}/properties/detail?externalID=${id}`);

    return {
        props : {
            propertyDetails : data
        }
    }
}
