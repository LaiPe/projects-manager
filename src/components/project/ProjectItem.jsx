import { memo } from 'react';

import { useListDispatchMethodsContext } from '../context/ListContext';

const ProjectItem = memo(({ project }) => {

    console.log('Render ProjectItem for project:', project.name);

    const onDelete = useListDispatchMethodsContext().deleteItem;

    return (
        <li>
            {project.name} (Created by User {project.creatorId})
            <button onClick={() => onDelete(project)}>Delete</button>
        </li>
    );
});

ProjectItem.displayName = 'ProjectItem';

export default ProjectItem;