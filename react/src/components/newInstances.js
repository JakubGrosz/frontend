import React from 'react'
import styled from 'styled-components'
import {NoUl, H3} from './Commons'
import {Droppable} from 'react-beautiful-dnd'
import AddInstance from './AddInstance'
import {useSearchApi} from '../utils/useApi.js'

const Instance = ({instance, provided}) => {
  const datasetIds = instance.datasets.reduce(
    (acc, val) => [...acc, {pid: val}],
    []
  )
  const query = {
    where: {
      or: datasetIds
    }
  }
  const {data: datasets, isLoading} = useSearchApi('Datasets', query)
  return (
    <>
      {isLoading ? (
        <p>Loading</p>
      ) : (
        <div>
          <a
            href="http://localhost:8888/lab"
            rel="noopener noreferrer"
            target="_blank"
          >
            <H3>{instance.name}</H3>
          </a>
          <div>
            {instance.flavour.type} - {instance.flavour.name}
          </div>
          <b>Datasets:</b>
          <ul>
            {datasets.map((dataset) => (
              <li key={dataset.pid}>
                <i>{dataset.title}</i>
              </li>
            ))}
            {provided.placeholder}
          </ul>
        </div>
      )}
    </>
  )
}

const Instances = (props) => (
  <>
    <NoUl>
      {props.instances.map((e) => (
        <Droppable key={e._id} droppableId={e._id}>
          {(provided) => (
            <LiInstance ref={provided.innerRef} {...provided.droppableProps}>
              <Instance
                instance={e}
                provided={provided}
                dropDataset={
                  props.dropDataset &&
                  e._id === props.dropDataset.instance &&
                  props.dropDataset
                }
              />
            </LiInstance>
          )}
        </Droppable>
      ))}
    </NoUl>
    <AddInstance setAddNewInstance={props.setAddNewInstance} />
  </>
)

export default Instances

const LiInstance = styled.li`
  background-color: ${(props) =>
    props.active ? 'var(--color-bg-2)' : 'var(--color-bg-1)'};
  margin-bottom: var(--dist);
  padding: var(--dist);
`
