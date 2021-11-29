

// import loading related 
import { useEffect, useState } from 'react';
import { Flex, Select, Box, Text, Input, Spinner, Icon, Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { MdCancel } from 'react-icons/md';
import Image from 'next/image';

import { filterData, getFilterValues } from '../utils/filterData';
import { baseUrl, fetchApi } from '../utils/fetchApi';
//ends

import NotFoundImg from "../public/assets/404.svg" ;


function SearchFilter() {

    const [filters, setFilters] = useState(filterData); // store default filter data
    // loading location related code
    const [searchTerm, setSearchTerm] = useState('');
  const [locationData, setLocationData] = useState();
  const [showLocations, setShowLocations] = useState(false);
  const [loading, setLoading] = useState(false);
    // ends
    const router = useRouter();

    const searchProperties = (filterValues) => { // whenever you select perticular filter data
        const path = router.pathname ;
        const {query} = router ;

        const values = getFilterValues(filterValues) ;

        values.forEach(item => {
            if(item.value && filterValues?.[item.name]){ // only render filtered query
                query[item.name] = item.value ;
            }
        });

        router.push({ pathname:path, query});
    }


    //useEffect 
    useEffect(() => {
        if (searchTerm !== '') {
          const fetchData = async () => {
            setLoading(true);
            const data = await fetchApi(`${baseUrl}/auto-complete?query=${searchTerm}`);
            setLoading(false);
            setLocationData(data?.hits);
          };
    
          fetchData();
        }
      }, [searchTerm]);

    return (
        <Flex bg='gray.100' p='4' justifyContent='center' flexWrap='wrap'>
            {
                filters.map(filter => (
                    <Box key={filter.queryName}>
                        <Select
                        placeholder={filter.placeholder}
                        w='fit-content'
                        p='2'
                        onChange={e=> searchProperties({ [filter.queryName] : e.target.value})}
                        >
                          {
                              filter?.items?.map(item => (
                                  <option value={item.value} key={item.value}>{item.name}</option>
                              ))
                          }
                        </Select>
                    </Box>
                ))
            }

            {/** Loading Location filter */}
            <Flex flexDir='column'>
        <Button onClick={() => setShowLocations(!showLocations)} border='1px' borderColor='gray.200' marginTop='2' >
          Search Location
        </Button>
        {showLocations && (
          <Flex flexDir='column' pos='relative' paddingTop='2'>
            <Input
              placeholder='Type Here'
              value={searchTerm}
              w='300px'
              focusBorderColor='gray.300'
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm !== '' && (
              <Icon
                as={MdCancel}
                pos='absolute'
                cursor='pointer'
                right='5'
                top='5'
                zIndex='100'
                onClick={() => setSearchTerm('')}
              />
            )}
            {loading && <Spinner margin='auto' marginTop='3' />}
            {showLocations && (
              <Box height='300px' overflow='auto'>
                {locationData?.map((location) => (
                  <Box
                    key={location.id}
                    onClick={() => {
                      searchProperties({ locationExternalIDs: location.externalID });
                      setShowLocations(false);
                      setSearchTerm(location.name);
                    }}
                  >
                    <Text cursor='pointer' bg='gray.200' p='2' borderBottom='1px' borderColor='gray.100' >
                      {location.name}
                    </Text>
                  </Box>
                ))}
                {!loading && !locationData?.length && (
                  <Flex justifyContent='center' alignItems='center' flexDir='column' marginTop='5' marginBottom='5' >
                    {/*<Image src={NotFoundImg} />*/}
                    <Text fontSize='xl' marginTop='3'>
                      Waiting to search!
                    </Text>
                  </Flex>
                )}
              </Box>
            )}
          </Flex>
        )}
      </Flex>
      {/** Ends Loading Location part */}
        </Flex>
    )
}

export default SearchFilter
