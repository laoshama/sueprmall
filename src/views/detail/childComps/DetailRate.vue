<template>
  <div class="rate" v-if="Object.keys(rates).length !== 0">
    <div>评价信息</div>
    <div v-for="(item, index) in rates.list" :key="index">
      <div>{{ item.style }}</div>
      <div>{{ item.content }}</div>
    </div>
    <ul>
      <li>评价信息1</li>
      <li>评价信息2</li>
      <li>评价信息3</li>
      <li>评价信息4</li>
      <li>评价信息5</li>
      <li>评价信息6</li>
      <li>评价信息7</li>
      <li>评价信息8</li>
      <li>评价信息9</li>
      <li>评价信息10</li>
      <li>评价信息11</li>
      <li>评价信息12</li>
      <li>评价信息13</li>
      <li>评价信息14</li>
      <li>评价信息15</li>
      <li>评价信息16</li>
      <li>评价信息17</li>
      <li>评价信息18</li>
      <li>评价信息19</li>
      <li>评价信息20</li>
      <li>评价信息21</li>
      <li>评价信息22</li>
      <li>评价信息23</li>
      <li>评价信息24</li>
      <li>评价信息25</li>
      <li>评价信息26</li>
      <li>评价信息27</li>
      <li>评价信息28</li>
      <li>评价信息29</li>
      <li>评价信息30</li>
      <li>评价信息31</li>
      <li>评价信息32</li>
      <li>评价信息33</li>
      <li>评价信息34</li>
      <li>评价信息35</li>
      <li>评价信息36</li>
      <li>评价信息37</li>
      <li>评价信息38</li>
      <li>评价信息39</li>
      <li>评价信息40</li>
      <li>评价信息41</li>
      <li>评价信息42</li>
      <li>评价信息43</li>
      <li>评价信息44</li>
      <li>评价信息45</li>
      <li>评价信息46</li>
      <li>评价信息47</li>
      <li>评价信息48</li>
      <li>评价信息49</li>
      <li>评价信息50</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'DetailRate',
  props: {
    rates: {
      type: Object,
      default () {
        return {}
      }
    }
  }
}
</script>

<style scoped>
  div {
    font-size: 16px;
    margin-top: 10px;
  }
</style>
