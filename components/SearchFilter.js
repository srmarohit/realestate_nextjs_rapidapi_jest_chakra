
import { Box, Flex } from '@chakra-ui/layout'
import { Select } from '@chakra-ui/select';
import { useRouter } from 'next/dist/client/router';
import React, { useState } from 'react'

// import filter data sets
import {filterData, getFilterValues} from "../utils/filterData";

function SearchFilter() {

    const [filters, setFilters] = useState(filterData); // store default filter data
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
        </Flex>
    )
}

export default SearchFilter
