import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Grid, FormControl, Select, MenuItem, TextField, InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import styled from 'styled-components';
import { inject } from 'mobx-react';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

const FiltersContainer = styled.div`
  margin-top: 20px;
`;

const ControlContainer = styled.div`
  background-color: #c0cde0;
  border-radius: 5px;
  padding: 10px;
`;

const TasksFilters = inject('tasksStore')((props) => {
  const filters$ = useMemo(() => new Subject(), []);
  const [status, setStatus] = useState(props.tasksStore.filters.status || ''); // Use empty string as default
  const [search, setSearch] = useState(props.tasksStore.filters.search || ''); // Use empty string as default

  useEffect(() => {
    const subscription = filters$
      .pipe(debounceTime(500))
      .subscribe(filters => {
        props.tasksStore.setFilters(filters);
      });

    return () => subscription.unsubscribe();
  }, [props.tasksStore, filters$]);

  const syncFilters = useCallback(() => {
    const filters = { status, search };
    filters$.next(filters);
    props.tasksStore.fetchTasksWithFilters(filters);
  }, [status, search, filters$, props.tasksStore]);

  useEffect(() => {
    syncFilters();
  }, [status, search, syncFilters]); // Include syncFilters in the dependencies array here

  const handleStatusFilterChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSearchTermChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <FiltersContainer>
      <Grid
        justifyContent="space-between"
        container
      >
        <Grid item>
          <ControlContainer>
            <FormControl style={{ width: '220px' }}>
              <TextField
                placeholder="Search..."
                value={search}
                onChange={handleSearchTermChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
          </ControlContainer>
        </Grid>

        <Grid item>
          <ControlContainer>
            <FormControl style={{ width: '220px' }}>
              <Select
                value={status}
                onChange={handleStatusFilterChange}
                displayEmpty
              >
                <MenuItem value="">No status filter</MenuItem>
                <MenuItem value={'OPEN'}>Open</MenuItem>
                <MenuItem value={'IN_PROGRESS'}>In Progress</MenuItem>
                <MenuItem value={'DONE'}>Done</MenuItem>
              </Select>
            </FormControl>
          </ControlContainer>
        </Grid>
      </Grid>
    </FiltersContainer>
  );
});

export default TasksFilters;
