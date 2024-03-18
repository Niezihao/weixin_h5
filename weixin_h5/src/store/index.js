// store.js
import { createStore } from 'vuex';

export default createStore({
    state() {
        return {
            count: 0, // 示例状态
            musicInfo: { title: '', artist: '', playing: false }, // 音乐播放相关状态
        };
    },
    mutations: {
        increment(state) {
            state.count++;
        },
        setMusicInfo(state, info) {
            state.musicInfo = { ...state.musicInfo, ...info };
        },
    },
    actions: {
        async loadMusicData({ commit }) {
            // 异步获取音乐数据并提交到mutation更新状态
            const data = await fetchMusicData(); // 假设fetchMusicData是异步获取音乐信息的方法
            commit('setMusicInfo', data);
        },
    },
    getters: {
        formattedMusicTitle: (state) => `${state.musicInfo.title} - ${state.musicInfo.artist}`,
        isPlaying: (state) => state.musicInfo.playing,
    },
});