import ListItem from "./listItem";

export default async function List() {
    let result = [{
        _id: 1, title: 't-1', content: 't-2'
    }];


    return (
        <div className="list-bg">
            <ListItem result={result} />
        </div>
    );
}