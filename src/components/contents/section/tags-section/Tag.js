import React from 'react';
import { Link } from 'react-router-dom';

export default function Tag({ tag }) {
    return (
        <Link className="tag" to={"/tags/" + tag}>
            {tag}
        </Link>
    )
}
