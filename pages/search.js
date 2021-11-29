
import Image from "next/image";
import Icon from '@chakra-ui/icon';
import { Box, Flex, Text } from '@chakra-ui/layout';
import { useRouter } from 'next/dist/client/router';
import React, { useState } from 'react';
import { BsFilter } from 'react-icons/bs';
import Property from '../components/Property';
import SearchFilter from '../components/SearchFilter';
import { baseUrl, fetchApi } from '../utils/fetchApi';

import NotFoundImg from "../public/assets/404.svg" ;

function Search({properties}) {
    const [searchFilter, setSearchFilter] = useState(false);
    const router = useRouter();

    return (
        <Box>
            <Flex bg='gray.100' justifyContent='center' alignItems='center' p='2' borderBottom='1' borderColor='gray.200' fontSize='lg' fontWeight='black' >
                <Text>Search Property By Filter</Text>
                <Icon
                 paddingLeft='2'
                 cursor='pointer'
                 w='7'
                 as={BsFilter}
                 onClick={()=> setSearchFilter(prevSearchFilter => !prevSearchFilter )}
                 />
            </Flex>
            { searchFilter && <SearchFilter/> }
            <Text fontWeight='bold' fontSize='2xl' p='4'>
                Properties {router.query.purpose}
            </Text>
            <Flex flexWrap='wrap'>
                {
                properties && properties.map(property => <Property property={property} key={property.id} />)
                }
            </Flex>
            {
                properties.length === 0 && (
                    <Box textAlign="center">
                        <Image src={NotFoundImg} width="400px" height="450px"/>
                        <Text fontSize='md' fontWeight="500" marginTop='3'>No Result Found ..</Text>
                    </Box>
                )
            }
        </Box>
    )
}


// get the properties by query apply in getServerSideProps()

export async function getServerSideProps({ query }) {
    const purpose = query.purpose || 'for-rent';
    const rentFrequency = query.rentFrequency || 'yearly';
    const minPrice = query.minPrice || '0';
    const maxPrice = query.maxPrice || '1000000';
    const roomsMin = query.roomsMin || '0';
    const bathsMin = query.bathsMin || '0';
    const sort = query.sort || 'price-desc';
    const areaMax = query.areaMax || '35000';
    const locationExternalIDs = query.locationExternalIDs || '5002';
    const categoryExternalID = query.categoryExternalID || '4';
  
    const data = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&categoryExternalID=${categoryExternalID}&bathsMin=${bathsMin}&rentFrequency=${rentFrequency}&priceMin=${minPrice}&priceMax=${maxPrice}&roomsMin=${roomsMin}&sort=${sort}&areaMax=${areaMax}`);
  
    return {
      props: {
        properties: data?.hits,
      },
    };
  }



export default Search;


