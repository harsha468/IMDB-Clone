<template>
    <nav>
        <ul>
            <li>
                <img
                    src="../assets/logos/Imdb-logo.png"
                    width="60"
                    height="30"
                />
            </li>
            <li>
                <router-link
                    to="/movies"
                    tag="p"
                >
                    Movies
                </router-link>
            </li>
            <li>
                <router-link
                    to="/actors"
                    tag="p"
                >
                    Actors
                </router-link>
            </li>
            <li>
                <router-link
                    to="/producers"
                    tag="p"
                >
                    Producers
                </router-link>
            </li>
            <li>
                <router-link
                    to="/genres"
                    tag="p"
                >
                    Genres
                </router-link>
            </li>
        </ul>
    </nav>
</template>

<style scoped>
nav {
    width: 100%;
    background: #1f1f1f;
    justify-content: space-between;
    flex-wrap: wrap;
    display: block;
    padding: 0px;
    position: relative;
}
nav ul {
    list-style: none;
    padding: 0px 10px;
}
nav ul li {
    display: table-cell;
    padding: 0px 0px;
    text-decoration: none;
}
nav ul li p {
    vertical-align: middle;
    margin: 5px 5px;
    color: #f2f2f2;
    font-size: 15px;
    font-weight: 500;
    padding: 8px;
    letter-spacing: 1px;
    transition: all 0.5s ease;
    cursor: pointer;
    text-decoration: none;
}
nav ul li img {
    vertical-align: middle;
    margin: 5px 5px;
    cursor: pointer;
}
nav ul li p.active,
nav ul li p:hover,
.router-link-active {
    color: #fece13;
    border-bottom: 1px dotted #fece13;
}
</style>
